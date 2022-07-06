import { AxiosInstance } from 'axios';
import { BaseResponse } from '../models';
import { GetSmsReplyResponse, GetSmsResponse, GetSmsRecipientRequest, GetSmsRecipientResponse, ListSmsNumbersResponse, ListSmsRepliesRequest, ListSmsRepliesResponse, ListSentSmsRequest, ListSentSmsResponse, SubmitSmsRequest, SubmitSmsResponse } from '../types';
export declare class SmsService {
    private httpClient;
    private basePath;
    constructor(httpClient: AxiosInstance);
    listSentSms(request: ListSentSmsRequest): Promise<BaseResponse<ListSentSmsResponse>>;
    submitSms(request: SubmitSmsRequest): Promise<BaseResponse<SubmitSmsResponse>>;
    getSms(id: string): Promise<BaseResponse<GetSmsResponse>>;
    getSmsRecipientMessage(request: GetSmsRecipientRequest): Promise<BaseResponse<GetSmsRecipientResponse>>;
    listSmsReplies(request: ListSmsRepliesRequest): Promise<BaseResponse<ListSmsRepliesResponse>>;
    getSmsReply(replyID: string): Promise<BaseResponse<GetSmsReplyResponse>>;
    listSmsNumbers(): Promise<BaseResponse<ListSmsNumbersResponse>>;
}
