export declare const dateToTimestamp: (date: Date, isMax?: boolean | undefined) => number;
export declare const generateSignature: (message: string, key: string) => string;
export declare const verifySignature: (signatureHeader: string, payload: any, signingSecret: string, timeToleranceSec?: number) => boolean;
