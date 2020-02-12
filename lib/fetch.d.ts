import { ErrorTypes } from '.';
/**
 * Supported HTTP methods
 */
export declare type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
/**
 * Interface that describes the options for a HTTP request
 */
export interface FetchOptions {
    method: HttpMethod;
    headers?: {
        [i: string]: string;
    };
    body?: string;
    timeout?: number;
}
declare class FetchResponse {
    ok: boolean;
    status: number;
    statusText: string;
    size: number;
    private data;
    private constructor();
    text(): string;
    json(): any;
    static response(ok: boolean, data?: string, status?: number): FetchResponse;
}
/**
 * convenience method to perform a HTTP request
 * @param url url of the endpoint
 * @param ops configuration options for the request
 * @returns the request response
 */
export declare function fetch(url: string, ops: FetchOptions): Promise<FetchResponse>;
/**
 * Convenience class to rety operations that could fail. The type `<P>`
 * describes the class type that would be thrown (if needed)
 */
export declare class ErrorTools<P extends Error> {
    private errClass;
    /**
     * Builds an `ErrorTools` object
     * @param errClass error class constructor that should be used if something
     * needs to be thrown
     */
    constructor(errClass: new (errorType: keyof typeof ErrorTypes, ...params: any[]) => P);
    /**
     * Attempt an operation that returns an object of type `<T>` and that
     * consumes arguments of type `...<U>[]`
     * @param errorType The type of the error that will be thrown in case of failure
     * @param op function to call
     * @param params arguments to pass to the previous function
     * @returns the response provided by the function
     */
    tryOp<T, U extends any[]>(errorType: keyof typeof ErrorTypes, op: ((...params: U) => T), ...params: U): T;
    /**
     * Attempt an async operation that returns an object of type `<T>` and that
     * consumes arguments of type `...<U>[]`
     * @param errorType The type of the error that will be thrown in case of failure
     * @param op function to call
     * @param params arguments to pass to the previous function
     * @returns a promise with the response provided by the function
     */
    tryAsyncOp<T, U extends any[]>(errorType: keyof typeof ErrorTypes, op: ((...params: U) => Promise<T>), ...params: U): Promise<T>;
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
    retrier<T, O>(errorType: keyof typeof ErrorTypes, n: number | undefined, delay: number | undefined, op: (...args: T[]) => Promise<O>, ...params: T[]): Promise<O>;
}
export {};
