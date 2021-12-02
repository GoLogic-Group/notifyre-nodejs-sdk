import axios, { AxiosInstance } from 'axios';
import { baseUrl, defaultVersion } from './config';
import { ContactsService, FaxService, SmsService } from './services';

export class NotifyreAPI {
  private httpClient: AxiosInstance;

  constructor(
    private apiKey: string,
    private version: string = defaultVersion
  ) {
    this.httpClient = axios.create({
      baseURL: `${baseUrl}/${version}`,
      headers: {
        'x-api-token': this.apiKey,
        'user-agent': this.version
      }
    });
  }

  getFaxService(): FaxService {
    return new FaxService(this.httpClient);
  }

  getSmsService(): SmsService {
    return new SmsService(this.httpClient);
  }

  getContactsService(): ContactsService {
    return new ContactsService(this.httpClient);
  }
}

export * from './constants';
export * from './models';
export * from './types';
export { verifySignature } from './utilities';
