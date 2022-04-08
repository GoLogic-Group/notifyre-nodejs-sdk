import { AxiosInstance } from 'axios';
import { BaseResponse, NotifyreError } from '../models';
import {
  DownloadReceivedFaxResponse,
  DownloadSentFaxRequest,
  DownloadSentFaxResponse,
  FaxDocument,
  ListCoverPagesResponse,
  ListFaxNumbersResponse,
  ListReceivedFaxesResponse,
  ListReceivedFaxesRequest,
  ListSentFaxesRequest,
  ListSentFaxesResponse,
  SubmitFaxRequest,
  SubmitFaxResponse,
  UploadDocumentResponse
} from '../types';
import { dateToTimestamp } from '../utilities';

export class FaxService {
  private basePath = '/fax';

  constructor(private httpClient: AxiosInstance) {}

  listSentFaxes(
    request: ListSentFaxesRequest
  ): Promise<BaseResponse<ListSentFaxesResponse>> {
    return this.httpClient.get(`${this.basePath}/send`, {
      params: {
        fromDate: dateToTimestamp(request.fromDate, false),
        toDate: dateToTimestamp(request.toDate, true),
        sort: request.sort,
        limit: request.limit
      }
    });
  }

  async submitFax(
    request: SubmitFaxRequest
  ): Promise<BaseResponse<SubmitFaxResponse>> {
    const files = await Promise.all(
      request.documents.map((document) => this.uploadDocument(document))
    );

    if (files.find((file) => !file.success)) {
      throw new NotifyreError(
        'The document upload process failed',
        400,
        files.map((file) => (file.success ? null : file.message))
      );
    }

    return this.httpClient.post(`${this.basePath}/send`, {
      templateName: request.templateName,
      faxes: {
        clientReference: request.clientReference,
        files: files.map((file) => file.payload!.fileID),
        header: request.header,
        isHighQuality: request.isHighQuality,
        recipients: request.recipients,
        scheduledDate: request.scheduledDate
          ? dateToTimestamp(request.scheduledDate)
          : null,
        sendFrom: request.sendFrom,
        senderID: request.sendFrom,
        subject: request.subject
      }
    });
  }

  private uploadDocument(
    request: FaxDocument
  ): Promise<BaseResponse<UploadDocumentResponse>> {
    return this.httpClient
      .post(`${this.basePath}/send/conversion`, request)
      .catch((err) => err);
  }

  downloadSentFax(
    request: DownloadSentFaxRequest
  ): Promise<BaseResponse<DownloadSentFaxResponse>> {
    return this.httpClient.get(
      `${this.basePath}/send/recipients/${request.id}/download`,
      {
        params: {
          fileType: request.fileType
        }
      }
    );
  }

  listCoverPages(): Promise<BaseResponse<ListCoverPagesResponse[]>> {
    return this.httpClient.get(`${this.basePath}/coverpages`);
  }

  listReceivedFaxes(
    request: ListReceivedFaxesRequest
  ): Promise<BaseResponse<ListReceivedFaxesResponse[]>> {
    return this.httpClient.get(`${this.basePath}/received`, {
      params: request
    });
  }

  downloadReceivedFax(
    faxId: string
  ): Promise<BaseResponse<DownloadReceivedFaxResponse>> {
    return this.httpClient.get(`${this.basePath}/received/${faxId}/download`);
  }

  listFaxNumbers(): Promise<BaseResponse<ListFaxNumbersResponse>> {
    return this.httpClient.get(`${this.basePath}/numbers`);
  }
}
