export declare class BaseResponse<T = any> {
    success: boolean;
    statusCode: number;
    payload: T | null;
    message: string;
    errors: any[];
    constructor(success: boolean, statusCode: number, message: string, payload: T | null, errors?: any[]);
}
