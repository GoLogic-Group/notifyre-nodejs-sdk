import { AxiosInstance } from 'axios';
import { BaseResponse } from '../models';
import {
  GetSmsReplyResponse,
  GetSmsResponse,
  GetSmsRecipientRequest,
  GetSmsRecipientResponse,
  ListSmsNumbersResponse,
  ListSmsRepliesRequest,
  ListSmsRepliesResponse,
  ListSentSmsRequest,
  ListSentSmsResponse,
  SubmitSmsRequest,
  SubmitSmsResponse
} from '../types';

import { defaultVersion } from '../config';

export class SmsService {
  private basePath = '/sms';

  constructor(private httpClient: AxiosInstance) {}

  listSentSms(
    request: ListSentSmsRequest
  ): Promise<BaseResponse<ListSentSmsResponse>> {
    return this.httpClient.get(`${this.basePath}/send`, {
      params: {
        fromDate: request.fromDate,
        toDate: request.toDate,
        sort: request.sort,
        limit: request.limit,
        skip: request.skip
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
      scheduledDate: request.scheduledDate,
      addUnsubscribeLink: request.addUnsubscribeLink || false,
      callbackUrl: request.callbackUrl || "",
      metadata: request.metadata || {},
      callbackFormat: request.callbackFormat || "notifyre",
      apiVersion: defaultVersion
    });
  }

  getSms(id: string): Promise<BaseResponse<GetSmsResponse>> {
    return this.httpClient.get(
      `${this.basePath}/send/${id}`
    );
  }

  getSmsRecipientMessage(request: GetSmsRecipientRequest): Promise<BaseResponse<GetSmsRecipientResponse>> {
    return this.httpClient.get(
      `${this.basePath}/send/${request.messageID}/recipients/${request.recipientID}`
    );
  }

  listSmsReplies(
    request: ListSmsRepliesRequest
  ): Promise<BaseResponse<ListSmsRepliesResponse>> {
    return this.httpClient.get(`${this.basePath}/received`, {
      params: {
        fromDate: request.fromDate,
        toDate: request.toDate,
        sort: request.sort,
        limit: request.limit,
        skip: request.skip
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
