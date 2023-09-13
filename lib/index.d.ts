import { ContactsService, FaxService, MmsService, SmsService } from './services';
export declare class NotifyreAPI {
    readonly apiKey: string;
    readonly version: string;
    private handleResponse;
    private handleError;
    private httpClient;
    constructor(apiKey: string, version?: string, handleResponse?: (res: import("axios").AxiosResponse<any, any>) => any, handleError?: (res: import("axios").AxiosError<any, any>) => Promise<never>);
    getFaxService(): FaxService;
    getSmsService(): SmsService;
    getContactsService(): ContactsService;
    getMmsService(): MmsService;
}
export * from './constants';
export * from './models';
export * from './types';
export { verifySignature } from './utilities';
