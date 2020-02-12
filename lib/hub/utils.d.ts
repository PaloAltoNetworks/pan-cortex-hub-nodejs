import { SdkError, ErrorTypes } from '../sdkError';
export declare function expTokenExtractor(token: string): number;
export declare class HubError extends SdkError {
    constructor(errorType: keyof typeof ErrorTypes, ...params: any[]);
}
export declare function uuid(content: string): string;
