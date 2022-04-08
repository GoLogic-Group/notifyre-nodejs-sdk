import { AxiosInstance } from 'axios';
import { BaseResponse } from '../models';
import { DownloadReceivedFaxResponse, DownloadSentFaxRequest, DownloadSentFaxResponse, ListCoverPagesResponse, ListFaxNumbersResponse, ListReceivedFaxesResponse, ListReceivedFaxesRequest, ListSentFaxesRequest, ListSentFaxesResponse, SubmitFaxRequest, SubmitFaxResponse } from '../types';
export declare class FaxService {
    private httpClient;
    private basePath;
    constructor(httpClient: AxiosInstance);
    listSentFaxes(request: ListSentFaxesRequest): Promise<BaseResponse<ListSentFaxesResponse>>;
    submitFax(request: SubmitFaxRequest): Promise<BaseResponse<SubmitFaxResponse>>;
    private uploadDocument;
    downloadSentFax(request: DownloadSentFaxRequest): Promise<BaseResponse<DownloadSentFaxResponse>>;
    private pollDocumentsStatus;
    listCoverPages(): Promise<BaseResponse<ListCoverPagesResponse[]>>;
    listReceivedFaxes(request: ListReceivedFaxesRequest): Promise<BaseResponse<ListReceivedFaxesResponse[]>>;
    downloadReceivedFax(faxId: string): Promise<BaseResponse<DownloadReceivedFaxResponse>>;
    listFaxNumbers(): Promise<BaseResponse<ListFaxNumbersResponse>>;
}
