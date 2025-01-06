import { AxiosError, AxiosResponse } from 'axios';
export declare const generateSignature: (message: string, key: string) => string;
export declare const verifySignature: (signatureHeader: string, payload: any, signingSecret: string, timeToleranceSec?: number) => boolean;
export declare const responseInterceptor: (res: AxiosResponse) => any;
export declare const errorInterceptor: (res: AxiosError<any, any>) => Promise<never>;
