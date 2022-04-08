import { AxiosInstance } from 'axios';
import { BaseResponse } from '../models';
import {
  GetSmsReplyResponse,
  GetSmsRequest,
  GetSmsResponse,
  ListSmsNumbersResponse,
  ListSmsRepliesRequest,
  ListSmsRepliesResponse,
  ListSentSmsRequest,
  ListSentSmsResponse,
  SubmitSmsRequest,
  SubmitSmsResponse
} from '../types';
import { dateToTimestamp } from '../utilities';

export class SmsService {
  private basePath = '/sms';

  constructor(private httpClient: AxiosInstance) {}

  listSentSms(
    request: ListSentSmsRequest
  ): Promise<BaseResponse<ListSentSmsResponse>> {
    return this.httpClient.get(`${this.basePath}/send`, {
      params: {
        fromDate: dateToTimestamp(request.fromDate, false),
        toDate: dateToTimestamp(request.toDate, true),
        sort: request.sort,
        limit: request.limit
      }
    });
  }

  submitSms(
    request: SubmitSmsRequest
  ): Promise<BaseResponse<SubmitSmsResponse>> {
    return this.httpClient.post(`${this.basePath}/send`, {
      body: request.body,
      recipients: request.recipients,
      from: request.from,
      scheduledDate: request.scheduledDate
        ? dateToTimestamp(request.scheduledDate)
        : null
    });
  }

  getSms(request: GetSmsRequest): Promise<BaseResponse<GetSmsResponse>> {
    return this.httpClient.get(
      `${this.basePath}/send/${request.messageID}/recipients/${request.recipientID}`
    );
  }

  listSmsReplies(
    request: ListSmsRepliesRequest
  ): Promise<BaseResponse<ListSmsRepliesResponse>> {
    return this.httpClient.get(`${this.basePath}/received`, {
      params: {
        fromDate: dateToTimestamp(request.fromDate, false),
        toDate: dateToTimestamp(request.toDate, true),
        sort: request.sort,
        limit: request.limit
      }
    });
  }

  getSmsReply(replyID: string): Promise<BaseResponse<GetSmsReplyResponse>> {
    return this.httpClient.get(`${this.basePath}/received/${replyID}`);
  }

  listSmsNumbers(): Promise<BaseResponse<ListSmsNumbersResponse>> {
    return this.httpClient.get(`${this.basePath}/numbers`);
  }
}
