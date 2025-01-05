import { AxiosInstance } from 'axios';
import { BaseResponse } from '../models';
import { GetSmsReplyResponse, GetSmsResponse, GetSmsRecipientRequest, GetSmsRecipientResponse, ListSmsNumbersResponse, ListSmsRepliesRequest, ListSmsRepliesResponse, ListSentSmsRequest, ListSentSmsResponse, SubmitSmsRequest, SubmitSmsResponse, ListSmsPricesResponse, GetSmsReplyResponseV2 } from '../types';
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
    getSmsReplyV2(replyID: string): Promise<BaseResponse<GetSmsReplyResponseV2>>;
    listSmsNumbers(): Promise<BaseResponse<ListSmsNumbersResponse>>;
    listPrices(): Promise<BaseResponse<ListSmsPricesResponse>>;
}
