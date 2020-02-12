// Copyright 2015-2019 Palo Alto Networks, Inc
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//       http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { request, RequestOptions } from 'https'
import { commonLogger, logLevel } from './commonlogger'
import { URL } from 'url'
import { ErrorTypes } from '.'

/**
 * Supported HTTP methods
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

/**
 * Interface that describes the options for a HTTP request
 */
export interface FetchOptions {
    method: HttpMethod,
    headers?: { [i: string]: string },
    body?: string,
    timeout?: number
}

let seqno = Math.floor(Math.random() * 10000)

const statusTextDict: { [i: number]: string } = {
    200: '200 OK',
    300: '301 Moved Permanently',
    302: '302 Found',
    303: '303 See Other',
    304: '304 Not Modified',
    400: '400 Bad Request',
    401: '401 Unauthorized',
    500: '500 Internal Server Error',
    501: '501 Not Implemented',
    502: '502 Bad Gateway',
    503: '503 Service Unavailable',
    504: '504 Gateway Timeout'
}

class FetchResponse {
    ok: boolean
    status: number
    statusText: string
    size: number
    private data: string

    private constructor(ok: boolean, data = '', status = 200) {
        this.ok = ok
        this.data = data
        this.status = status
        this.statusText = (statusTextDict[status]) ? statusTextDict[status] : String(status)
        this.size = data.length
    }

    text(): string {
        return this.data
    }

    json(): any {
        return JSON.parse(this.data)
    }

    static response(ok: boolean, data?: string, status?: number): FetchResponse {
        return new FetchResponse(ok, data, status)
    }
}

/**
 * convenience method to perform a HTTP request
 * @param url url of the endpoint
 * @param ops configuration options for the request
 * @returns the request response
 */
export function fetch(url: string, ops: FetchOptions): Promise<FetchResponse> {
    let newUrl = new URL(url)
    let rOps: RequestOptions = {
        protocol: newUrl.protocol,
        hostname: newUrl.hostname,
        path: newUrl.pathname,
        method: ops.method,
        headers: ops.headers,
        timeout: ops.timeout
    }

    return new Promise((resolve, reject) => {
        commonLogger(logLevel.DEBUG, `[${++seqno}] fetch req: '${rOps.method}:${rOps.hostname}${rOps.path}'`)
        if (ops.body) {
            commonLogger(logLevel.DEBUG, `[${seqno}] body: '${ops.body}'`)
        }
        let cRequest = request(rOps, resp => {
            let data = '';
            resp.on('data', chunk => {
                data += chunk;
            });
            resp.on('end', () => {
                commonLogger(logLevel.DEBUG, `[${seqno}] fetch resp: '${data.length < 200 && data || data.slice(0, 198) + " ..."}'`)
                resolve(FetchResponse.response(
                    !(resp.statusCode && (resp.statusCode < 200 || resp.statusCode > 299)),
                    data,
                    resp.statusCode));
            });
        }).on("error", err => {
            commonLogger(logLevel.DEBUG, `[${seqno}] fetch err: '${err.message}'`)
            reject(Error(err.message))
        });
        cRequest.end(ops.body)
    })
}

/**
 * Convenience class to rety operations that could fail. The type `<P>`
 * describes the class type that would be thrown (if needed)
 */
export class ErrorTools<P extends Error> {
    private errClass: new (errorType: keyof typeof ErrorTypes, ...params: any[]) => P

    /**
     * Builds an `ErrorTools` object
     * @param errClass error class constructor that should be used if something
     * needs to be thrown
     */
    constructor(errClass: new (errorType: keyof typeof ErrorTypes, ...params: any[]) => P) {
        this.errClass = errClass
    }

    /**
     * Attempt an operation that returns an object of type `<T>` and that
     * consumes arguments of type `...<U>[]`
     * @param errorType The type of the error that will be thrown in case of failure
     * @param op function to call
     * @param params arguments to pass to the previous function
     * @returns the response provided by the function
     */
    tryOp<T, U extends any[]>(errorType: keyof typeof ErrorTypes, op: ((...params: U) => T), ...params: U): T {
        try {
            return op(...params)
        } catch (e) {
            throw new this.errClass(errorType, e)
        }
    }

    /**
     * Attempt an async operation that returns an object of type `<T>` and that
     * consumes arguments of type `...<U>[]`
     * @param errorType The type of the error that will be thrown in case of failure
     * @param op function to call
     * @param params arguments to pass to the previous function
     * @returns a promise with the response provided by the function
     */
    async tryAsyncOp<T, U extends any[]>(errorType: keyof typeof ErrorTypes, op: ((...params: U) => Promise<T>), ...params: U): Promise<T> {
        try {
            return await op(...params)
        } catch (e) {
            throw new this.errClass(errorType, e)
        }
    }

    /**
     * Generic retrier method that attemps to execute a function that returns a
     * response of type `<O>` provided an arrays of arguments of type `<T>`
     * @param errorType The type of the error that will be thrown in case of failure
     * @param n amount of times to attempt the operation (defaults to 3)
     * @param delay amounts of milliseconds to delay between attempts (defaults
     * to 100)
     * @param op function to be called
     * @param params arguments to be passed to the previous function
     * @returns a Promise with the result of the called function
     */
    async retrier<T, O>(errorType: keyof typeof ErrorTypes, n = 3, delay = 100, op: (...args: T[]) => Promise<O>, ...params: T[]): Promise<O> {
        let a = n
        let lastError: Error | undefined = undefined
        while (a > 0) {
            try {
                return await op(...params)
            } catch (e) {
                commonLogger(logLevel.INFO, `retier(): Failed attempt ${a}`)
                lastError = e
            }
            await new Promise((resolve) => {
                setTimeout(resolve, delay)
            })
            a--
        }
        throw (lastError) ? new this.errClass(errorType, lastError) : new this.errClass(errorType, 'reties exhausted')
    }
}