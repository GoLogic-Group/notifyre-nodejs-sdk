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

  async listSentFaxes(
    request: ListSentFaxesRequest
  ): Promise<BaseResponse<ListSentFaxesResponse>> {
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

  async submitFax(
    request: SubmitFaxRequest
  ): Promise<BaseResponse<SubmitFaxResponse>> {
    try {
      const files = await Promise.all(
        request.documents.map((document) => this.uploadDocument(document))
      );

      if (files.find((file) => !file.success)) {
        return new NotifyreError(
          'The document upload process failed',
          400,
          files.map((file) => (file.success ? null : file.message))
        );
      }

      return (
        await this.httpClient.post(`${this.basePath}/send`, {
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
        })
      ).data;
    } catch (err: any) {
      return new NotifyreError(err.message);
    }
  }

  private async uploadDocument(
    request: FaxDocument
  ): Promise<BaseResponse<UploadDocumentResponse>> {
    try {
      return (
        await this.httpClient.post(`${this.basePath}/send/conversion`, request)
      ).data;
    } catch (err: any) {
      return new NotifyreError(err.message);
    }
  }

  async downloadSentFax(
    request: DownloadSentFaxRequest
  ): Promise<BaseResponse<DownloadSentFaxResponse>> {
    try {
      return (
        await this.httpClient.get(
          `${this.basePath}/send/recipients/${request.id}/download`,
          {
            params: {
              fileType: request.fileType
            }
          }
        )
      ).data;
    } catch (err: any) {
      return new NotifyreError(err.message);
    }
  }

  async listCoverPages(): Promise<BaseResponse<ListCoverPagesResponse[]>> {
    try {
      return (await this.httpClient.get(`${this.basePath}/coverpages`)).data;
    } catch (err: any) {
      return new NotifyreError(err.message);
    }
  }

  async listReceivedFaxes(
    request: ListReceivedFaxesRequest
  ): Promise<BaseResponse<ListReceivedFaxesResponse[]>> {
    try {
      return (
        await this.httpClient.get(`${this.basePath}/received`, {
          params: request
        })
      ).data;
    } catch (err: any) {
      return new NotifyreError(err.message);
    }
  }

  async downloadReceivedFax(
    faxId: string
  ): Promise<BaseResponse<DownloadReceivedFaxResponse>> {
    try {
      return (
        await this.httpClient.get(`${this.basePath}/received/${faxId}/download`)
      ).data;
    } catch (err: any) {
      return new NotifyreError(err.message);
    }
  }

  async listFaxNumbers(): Promise<BaseResponse<ListFaxNumbersResponse>> {
    try {
      return (await this.httpClient.get(`${this.basePath}/numbers`)).data;
    } catch (err: any) {
      return new NotifyreError(err.message);
    }
  }
}
