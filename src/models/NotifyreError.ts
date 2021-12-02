import { BaseResponse } from '.';

export class NotifyreError extends BaseResponse {
  constructor(message: string, statusCode: number = 500, errors: any = []) {
    super(false, statusCode, message, null, errors);
  }
}
