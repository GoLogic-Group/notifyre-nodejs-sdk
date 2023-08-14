import { AxiosInstance } from 'axios';
import { BaseResponse } from '../models';
import { DownloadMmsReplyResponse } from '../types';
export declare class MmsService {
    private httpClient;
    private basePath;
    constructor(httpClient: AxiosInstance);
    downloadMmsReply(replyID: string): Promise<BaseResponse<DownloadMmsReplyResponse>>;
}
