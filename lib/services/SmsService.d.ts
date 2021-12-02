import { AxiosInstance } from 'axios';
import { BaseResponse } from '../models';
import { GetSmsReplyResponse, GetSmsRequest, GetSmsResponse, ListSmsNumbersResponse, ListSmsRepliesRequest, ListSmsRepliesResponse, ListSentSmsRequest, ListSentSmsResponse, SubmitSmsRequest, SubmitSmsResponse } from '../types';
export declare class SmsService {
    private httpClient;
    private basePath;
    constructor(httpClient: AxiosInstance);
    listSentSms(request: ListSentSmsRequest): Promise<BaseResponse<ListSentSmsResponse>>;
    submitSms(request: SubmitSmsRequest): Promise<BaseResponse<SubmitSmsResponse>>;
    getSms(request: GetSmsRequest): Promise<BaseResponse<GetSmsResponse>>;
    listSmsReplies(request: ListSmsRepliesRequest): Promise<BaseResponse<ListSmsRepliesResponse>>;
    getSmsReply(replyID: string): Promise<BaseResponse<GetSmsReplyResponse>>;
    listSmsNumbers(): Promise<BaseResponse<ListSmsNumbersResponse>>;
}
