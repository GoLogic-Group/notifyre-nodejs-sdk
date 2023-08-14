import { AxiosInstance } from 'axios';
import { BaseResponse } from '../models';
import { DownloadMmsReplyResponse } from '../types';

export class MmsService {
  private basePath = '/mms';

  constructor(private httpClient: AxiosInstance) {}

  downloadMmsReply(replyID: string): Promise<BaseResponse<DownloadMmsReplyResponse>> {
    return this.httpClient.get(`${this.basePath}/received/${replyID}/download`);
  }
}
