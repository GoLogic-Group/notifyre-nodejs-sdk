import { ContactsService, FaxService, SmsService } from './services';
export declare class NotifyreAPI {
    private apiKey;
    private version;
    private httpClient;
    constructor(apiKey: string, version?: string);
    getFaxService(): FaxService;
    getSmsService(): SmsService;
    getContactsService(): ContactsService;
}
export * from './constants';
export * from './models';
export * from './types';
export { verifySignature } from './utilities';
