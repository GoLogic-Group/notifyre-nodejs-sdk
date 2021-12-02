import { AxiosInstance } from 'axios';
import { BaseResponse, NotifyreError } from '../models';
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

  async listSentSms(
    request: ListSentSmsRequest
  ): Promise<BaseResponse<ListSentSmsResponse>> {
    try {
      return (
        await this.httpClient.get(`${this.basePath}/send`, {
          params: {
            fromDate: dateToTimestamp(request.fromDate, false),
            toDate: dateToTimestamp(request.toDate, true),
            sort: request.sort,
            limit: request.limit
          }
        })
      ).data;
    } catch (err: any) {
      return new NotifyreError(err.message);
    }
  }

  async submitSms(
    request: SubmitSmsRequest
  ): Promise<BaseResponse<SubmitSmsResponse>> {
    try {
      return (
        await this.httpClient.post(`${this.basePath}/send`, {
          body: request.body,
          recipients: request.recipients,
          from: request.from,
          scheduledDate: request.scheduledDate
            ? dateToTimestamp(request.scheduledDate)
            : null
        })
      ).data;
    } catch (err: any) {
      return new NotifyreError(err.message);
    }
  }

  async getSms(request: GetSmsRequest): Promise<BaseResponse<GetSmsResponse>> {
    try {
      return (
        await this.httpClient.get(
          `${this.basePath}/send/${request.messageID}/recipients/${request.recipientID}`
        )
      ).data;
    } catch (err: any) {
      return new NotifyreError(err.message);
    }
  }

  async listSmsReplies(
    request: ListSmsRepliesRequest
  ): Promise<BaseResponse<ListSmsRepliesResponse>> {
    try {
      return (
        await this.httpClient.get(`${this.basePath}/received`, {
          params: {
            fromDate: dateToTimestamp(request.fromDate, false),
            toDate: dateToTimestamp(request.toDate, true),
            sort: request.sort,
            limit: request.limit
          }
        })
      ).data;
    } catch (err: any) {
      return new NotifyreError(err.message);
    }
  }

  async getSmsReply(
    replyID: string
  ): Promise<BaseResponse<GetSmsReplyResponse>> {
    try {
      return (await this.httpClient.get(`${this.basePath}/received/${replyID}`))
        .data;
    } catch (err: any) {
      return new NotifyreError(err.message);
    }
  }

  async listSmsNumbers(): Promise<BaseResponse<ListSmsNumbersResponse>> {
    try {
      return (await this.httpClient.get(`${this.basePath}/numbers`)).data;
    } catch (err: any) {
      return new NotifyreError(err.message);
    }
  }
}
