import { AxiosInstance } from 'axios';
import { DocumentStatus } from '../constants';
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
  UploadDocumentResponse,
  GetDocumentStatusResponse,
  ListFaxPricesResponse
} from '../types';

export class FaxService {
  private basePath = '/fax';

  constructor(private httpClient: AxiosInstance) {}

  listSentFaxes(
    request: ListSentFaxesRequest
  ): Promise<BaseResponse<ListSentFaxesResponse>> {
    return this.httpClient.get(`${this.basePath}/send`, {
      params: {
        fromDate: request.fromDate,
        toDate: request.toDate,
        sort: request.sort,
        limit: request.limit,
        skip: request.skip,
        statusType: request.statusType
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

    const documents: BaseResponse<GetDocumentStatusResponse>[] =
      await this.pollDocumentsStatus(files.map((file) => file.payload!));

    return this.httpClient.post(`${this.basePath}/send`, {
      templateName: request.templateName,
      faxes: {
        clientReference: request.clientReference,
        files: documents.map((document) => document.payload!.id),
        header: request.header,
        isHighQuality: request.isHighQuality,
        recipients: request.recipients,
        scheduledDate: request.scheduledDate,
        sendFrom: request.sendFrom,
        senderID: request.sendFrom,
        subject: request.subject,
        campaignName: request.campaignName
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
      `${this.basePath}/send/recipients/${request.recipientID}/download`,
      {
        params: {
          fileType: request.fileType
        }
      }
    );
  }

  private async pollDocumentsStatus(
    request: UploadDocumentResponse[],
    iteration = 1
  ): Promise<BaseResponse<GetDocumentStatusResponse>[]> {
    if (iteration !== 1) {
      await new Promise<void>((resolve) =>
        setTimeout(() => {
          resolve();
        }, iteration * 5000)
      );
    }

    const documents: BaseResponse<GetDocumentStatusResponse>[] =
      await Promise.all(
        request.map((document) =>
          this.httpClient
            .get(`${this.basePath}/send/conversion/${document.fileName}`)
            .catch((err) => err)
        )
      );

    if (
      documents.find(
        (document) => document.payload?.status === DocumentStatus.Failed
      )
    ) {
      throw new NotifyreError(
        'The document conversion process failed',
        400,
        documents.map((document) =>
          document.success ? null : document.message
        )
      );
    }

    if (
      documents.every(
        (document) => document.payload?.status === DocumentStatus.Successful
      )
    ) {
      return documents;
    }

    return this.pollDocumentsStatus(request, iteration + 1);
  }

  listCoverPages(): Promise<BaseResponse<ListCoverPagesResponse[]>> {
    return this.httpClient.get(`${this.basePath}/coverpages`);
  }

  listReceivedFaxes(
    request: ListReceivedFaxesRequest
  ): Promise<BaseResponse<ListReceivedFaxesResponse>> {
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

  listPrices(): Promise<BaseResponse<ListFaxPricesResponse>> {
    return this.httpClient.get(`${this.basePath}/send/prices`);
  }
}
