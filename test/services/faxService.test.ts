import axios, { AxiosInstance } from 'axios';
import {
  ContentType,
  DocumentStatus,
  FileType,
  RecipientType,
  Sort
} from '../../src/constants';
import { baseUrl, defaultVersion } from '../../src/config';
import { BaseResponse, NotifyreError } from '../../src/models';
import { FaxService } from '../../src/services';
import {
  DownloadReceivedFaxResponse,
  DownloadSentFaxRequest,
  DownloadSentFaxResponse,
  GetDocumentStatusResponse,
  ListCoverPagesResponse,
  ListReceivedFaxesResponse,
  ListReceivedFaxesRequest,
  ListSentFaxesRequest,
  ListSentFaxesResponse,
  SubmitFaxRequest,
  SubmitFaxResponse,
  UploadDocumentResponse
} from '../../src/types';
import {
  dateToTimestamp,
  errorInterceptor,
  responseInterceptor
} from '../../src/utilities';

describe('FaxService', () => {
  let httpClient: AxiosInstance;
  let faxService: FaxService;

  beforeEach(() => {
    httpClient = axios.create({
      baseURL: `${baseUrl}/${defaultVersion}`,
      headers: {
        'x-api-token': '8817ac13-2b93-f11e-be86-6addca81156e',
        'user-agent': defaultVersion
      }
    });
    httpClient.interceptors.response.use(responseInterceptor, errorInterceptor);

    faxService = new FaxService(httpClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(faxService).toBeTruthy();
  });

  it('listSentFaxes - should be able to return list of sent faxes', async () => {
    const mockListSentFaxesResponse = new BaseResponse<ListSentFaxesResponse>(
      true,
      200,
      'OK',
      {
        faxes: [
          {
            createdDateUtc: 1637630568,
            friendlyID: 'KWLUF4LCQYML',
            fromNumber: '+61777777777',
            highQuality: true,
            id: '0226045c-3775-4cc2-86d9-9f623b56da31',
            lastModifiedDateUtc: 1637630646,
            pages: 1,
            queuedDateUtc: 1637630583,
            recipientID: '12d96f50-e210-4864-a3db-f549c929ab05',
            reference: '',
            status: 'successful',
            to: '+61291989589',
            failedMessage: ''
          }
        ]
      }
    );
    const fromDate = new Date(2021, 9, 1);
    const toDate = new Date(2021, 12, 1);
    const mockRequest: ListSentFaxesRequest = {
      fromDate,
      toDate,
      sort: Sort.Descending,
      limit: 10
    };
    const httpGetSpy = jest
      .spyOn(httpClient, 'get')
      .mockResolvedValue(mockListSentFaxesResponse);

    await expect(faxService.listSentFaxes(mockRequest)).resolves.toEqual(
      mockListSentFaxesResponse
    );
    expect(httpGetSpy).toHaveBeenCalledWith('/fax/send', {
      params: {
        fromDate: dateToTimestamp(mockRequest.fromDate, false),
        toDate: dateToTimestamp(mockRequest.toDate, true),
        sort: mockRequest.sort,
        limit: mockRequest.limit
      }
    });
  });

  it('listSentFaxes - should be able to handle system errors', async () => {
    const notifyreError = new NotifyreError('ERROR');
    const mockRequest: ListSentFaxesRequest = {
      fromDate: new Date(),
      toDate: new Date(),
      sort: Sort.Descending,
      limit: 10
    };
    jest.spyOn(httpClient, 'get').mockRejectedValue(notifyreError);

    await expect(faxService.listSentFaxes(mockRequest)).rejects.toEqual(
      notifyreError
    );
  });

  it('submitFax - should be able to submit fax', async () => {
    const mockRequest: SubmitFaxRequest = {
      templateName: '',
      documents: [
        {
          base64Str: 'dGVzdA==',
          contentType: ContentType.Txt
        }
      ],
      clientReference: 'sdk test',
      isHighQuality: false,
      recipients: [
        {
          type: RecipientType.FaxNumber,
          value: '+61711111111'
        }
      ],
      sendFrom: '',
      header: '',
      subject: '',
      scheduledDate: null
    };
    const mockFileName = '4ca38d82-c82a-45da-8f28-62c198bec078';
    const mockUploadDocumentResponse = new BaseResponse<UploadDocumentResponse>(
      true,
      200,
      'OK',
      {
        fileID: '99dd6d59-d919-4744-b19b-3ce5d0cb780b',
        fileName: mockFileName
      }
    );
    const mockSubmitFaxResponse = new BaseResponse<SubmitFaxResponse>(
      true,
      200,
      'OK',
      {
        faxID: '7853effe-e166-451a-ab3e-264f972a3c9f',
        friendlyID: 'OE5YC1C01NY4'
      }
    );
    const mockDocumentId = '97926ceb-4d33-44cd-a71b-ebfd297d1c74';
    const mockDocumentStatusIteration1 =
      new BaseResponse<GetDocumentStatusResponse>(false, 404, 'NotFound', null);
    const mockDocumentStatusIteration2 =
      new BaseResponse<GetDocumentStatusResponse>(true, 200, 'OK', {
        id: mockDocumentId,
        status: DocumentStatus.Initialised,
        pages: 1,
        fileName: mockFileName
      });
    const mockDocumentStatusIteration3 =
      new BaseResponse<GetDocumentStatusResponse>(true, 200, 'OK', {
        id: mockDocumentId,
        status: DocumentStatus.Successful,
        pages: 1,
        fileName: mockFileName
      });

    const httpPostSpy = jest
      .spyOn(httpClient, 'post')
      .mockResolvedValueOnce(mockUploadDocumentResponse)
      .mockResolvedValue(mockSubmitFaxResponse);

    const httpGetSpy = jest
      .spyOn(httpClient, 'get')
      .mockResolvedValueOnce(mockDocumentStatusIteration1)
      .mockResolvedValueOnce(mockDocumentStatusIteration2)
      .mockResolvedValue(mockDocumentStatusIteration3);

    await expect(faxService.submitFax(mockRequest)).resolves.toEqual(
      mockSubmitFaxResponse
    );
    expect(httpPostSpy).toHaveBeenNthCalledWith(
      1,
      '/fax/send/conversion',
      mockRequest.documents[0]
    );
    expect(httpGetSpy).toHaveBeenNthCalledWith(
      1,
      `/fax/send/conversion/${mockFileName}`
    );
    expect(httpGetSpy).toHaveBeenNthCalledWith(
      2,
      `/fax/send/conversion/${mockFileName}`
    );
    expect(httpGetSpy).toHaveBeenNthCalledWith(
      3,
      `/fax/send/conversion/${mockFileName}`
    );
    expect(httpPostSpy).toHaveBeenNthCalledWith(2, '/fax/send', {
      templateName: mockRequest.templateName,
      faxes: {
        clientReference: mockRequest.clientReference,
        files: [mockDocumentId],
        header: mockRequest.header,
        isHighQuality: mockRequest.isHighQuality,
        recipients: mockRequest.recipients,
        scheduledDate: null,
        sendFrom: mockRequest.sendFrom,
        senderID: mockRequest.sendFrom,
        subject: mockRequest.subject
      }
    });
  }, 30000);

  it('submitFax - should be able to submit scheduled fax', async () => {
    const scheduledDate = new Date();
    scheduledDate.setFullYear(scheduledDate.getFullYear() + 1);
    const mockRequest: SubmitFaxRequest = {
      templateName: '',
      documents: [
        {
          base64Str: 'dGVzdA==',
          contentType: ContentType.Txt
        }
      ],
      clientReference: 'sdk test',
      isHighQuality: false,
      recipients: [
        {
          type: RecipientType.FaxNumber,
          value: '+61711111111'
        }
      ],
      sendFrom: '+61777777777',
      header: '',
      subject: '',
      scheduledDate
    };
    const mockFileName = '4ca38d82-c82a-45da-8f28-62c198bec078';
    const mockUploadDocumentResponse = new BaseResponse<UploadDocumentResponse>(
      true,
      200,
      'OK',
      {
        fileID: '99dd6d59-d919-4744-b19b-3ce5d0cb780b',
        fileName: mockFileName
      }
    );
    const mockSubmitFaxResponse = new BaseResponse<SubmitFaxResponse>(
      true,
      200,
      'OK',
      {
        faxID: '7853effe-e166-451a-ab3e-264f972a3c9f',
        friendlyID: 'OE5YC1C01NY4'
      }
    );
    const mockDocumentId = '97926ceb-4d33-44cd-a71b-ebfd297d1c74';
    const mockDocumentStatusIteration1 =
      new BaseResponse<GetDocumentStatusResponse>(true, 200, 'OK', {
        id: mockDocumentId,
        status: DocumentStatus.Successful,
        pages: 1,
        fileName: mockFileName
      });

    const httpPostSpy = jest
      .spyOn(httpClient, 'post')
      .mockResolvedValueOnce(mockUploadDocumentResponse)
      .mockResolvedValue(mockSubmitFaxResponse);
    const httpGetSpy = jest
      .spyOn(httpClient, 'get')
      .mockResolvedValue(mockDocumentStatusIteration1);

    await expect(faxService.submitFax(mockRequest)).resolves.toEqual(
      mockSubmitFaxResponse
    );
    expect(httpPostSpy).toHaveBeenNthCalledWith(
      1,
      '/fax/send/conversion',
      mockRequest.documents[0]
    );
    expect(httpGetSpy).toHaveBeenNthCalledWith(
      1,
      `/fax/send/conversion/${mockFileName}`
    );
    expect(httpPostSpy).toHaveBeenNthCalledWith(2, '/fax/send', {
      templateName: mockRequest.templateName,
      faxes: {
        clientReference: mockRequest.clientReference,
        files: [mockDocumentId],
        header: mockRequest.header,
        isHighQuality: mockRequest.isHighQuality,
        recipients: mockRequest.recipients,
        scheduledDate: dateToTimestamp(scheduledDate),
        sendFrom: mockRequest.sendFrom,
        senderID: mockRequest.sendFrom,
        subject: mockRequest.subject
      }
    });
  }, 30000);

  it('submitFax - should be able to handle upload document error', async () => {
    const notifyreError = new NotifyreError(
      'The document upload process failed',
      400,
      [null, 'ERROR']
    );
    const mockRequest: SubmitFaxRequest = {
      templateName: '',
      documents: [
        {
          base64Str: 'dGVzdA==',
          contentType: ContentType.Txt
        },
        {
          base64Str: 'dGVzdA==',
          contentType: ContentType.Txt
        }
      ],
      clientReference: 'sdk test',
      isHighQuality: false,
      recipients: [
        {
          type: RecipientType.FaxNumber,
          value: '+61711111111'
        }
      ],
      sendFrom: '+61777777777',
      header: '',
      subject: '',
      scheduledDate: null
    };
    const mockUploadDocumentResponseItem1 =
      new BaseResponse<UploadDocumentResponse>(true, 200, 'OK', {
        fileID: '99dd6d59-d919-4744-b19b-3ce5d0cb780b',
        fileName: '4ca38d82-c82a-45da-8f28-62c198bec078'
      });
    const mockUploadDocumentResponseItem2 = new NotifyreError('ERROR');

    jest
      .spyOn(httpClient, 'post')
      .mockResolvedValueOnce(mockUploadDocumentResponseItem1)
      .mockRejectedValueOnce(mockUploadDocumentResponseItem2);

    await expect(faxService.submitFax(mockRequest)).rejects.toEqual(
      notifyreError
    );
  });

  it('submitFax - should be able to handle document conversion error', async () => {
    const notifyreError = new NotifyreError(
      'The document conversion process failed',
      400,
      ['ERROR', null]
    );
    const mockRequest: SubmitFaxRequest = {
      templateName: '',
      documents: [
        {
          base64Str: 'dGVzdA==',
          contentType: ContentType.Txt
        },
        {
          base64Str: 'dGVzdA==',
          contentType: ContentType.Txt
        }
      ],
      clientReference: 'sdk test',
      isHighQuality: false,
      recipients: [
        {
          type: RecipientType.FaxNumber,
          value: '+61711111111'
        }
      ],
      sendFrom: '+61777777777',
      header: '',
      subject: '',
      scheduledDate: null
    };
    const mockFileName1 = '4ca38d82-c82a-45da-8f28-62c198bec078';
    const mockFileName2 = '99dd6d59-d919-4744-b19b-3ce5d0cb780b';
    const mockUploadDocumentResponseItem1 =
      new BaseResponse<UploadDocumentResponse>(true, 200, 'OK', {
        fileID: '99dd6d59-d919-4744-b19b-3ce5d0cb780b',
        fileName: mockFileName1
      });
    const mockUploadDocumentResponseItem2 =
      new BaseResponse<UploadDocumentResponse>(true, 200, 'OK', {
        fileID: '4ca38d82-c82a-45da-8f28-62c198bec078',
        fileName: mockFileName2
      });
    const mockDocumentId1 = '97926ceb-4d33-44cd-a71b-ebfd297d1c74';
    const mockDocumentId2 = '97926bec-4d33-44cd-a71b-ebfd297d1c74';
    const mockDocumentStatusIteration1Item1 =
      new BaseResponse<GetDocumentStatusResponse>(false, 500, 'ERROR', {
        id: mockDocumentId1,
        status: DocumentStatus.Failed,
        pages: 1,
        fileName: mockFileName1
      });
    const mockDocumentStatusIteration1Item2 =
      new BaseResponse<GetDocumentStatusResponse>(true, 200, 'OK', {
        id: mockDocumentId2,
        status: DocumentStatus.Successful,
        pages: 1,
        fileName: mockFileName2
      });

    jest
      .spyOn(httpClient, 'post')
      .mockResolvedValueOnce(mockUploadDocumentResponseItem1)
      .mockResolvedValue(mockUploadDocumentResponseItem2);
    jest
      .spyOn(httpClient, 'get')
      .mockResolvedValueOnce(mockDocumentStatusIteration1Item1)
      .mockRejectedValueOnce(mockDocumentStatusIteration1Item2);

    await expect(faxService.submitFax(mockRequest)).rejects.toEqual(
      notifyreError
    );
  });

  it('downloadSentFax - should be able to return base64 string of sent fax', async () => {
    const mockRequest: DownloadSentFaxRequest = {
      recipientID: 'ada2edec-e5e0-4ba4-bae8-a37a0e34becb',
      fileType: FileType.Pdf
    };
    const mockDownloadSentFaxResponse =
      new BaseResponse<DownloadSentFaxResponse>(true, 200, 'OK', {
        base64Str: 'dGVzdA=='
      });

    const httpGetSpy = jest
      .spyOn(httpClient, 'get')
      .mockResolvedValue(mockDownloadSentFaxResponse);

    await expect(faxService.downloadSentFax(mockRequest)).resolves.toEqual(
      mockDownloadSentFaxResponse
    );
    expect(httpGetSpy).toHaveBeenCalledWith(
      `/fax/send/recipients/${mockRequest.recipientID}/download`,
      {
        params: {
          fileType: mockRequest.fileType
        }
      }
    );
  }, 30000);

  it('downloadSentFax - should be able to handle system errors', async () => {
    const notifyreError = new NotifyreError('ERROR');
    const mockRequest: DownloadSentFaxRequest = {
      recipientID: 'ada2edec-e5e0-4ba4-bae8-a37a0e34becb',
      fileType: FileType.Pdf
    };

    jest.spyOn(httpClient, 'get').mockRejectedValue(notifyreError);

    await expect(faxService.downloadSentFax(mockRequest)).rejects.toEqual(
      notifyreError
    );
  });

  it('listCoverPages - should be able to return cover pages', async () => {
    const mockListCoverPagesResponse = new BaseResponse<
      ListCoverPagesResponse[]
    >(true, 200, 'OK', [
      {
        html: '<p>Cover Page</p>',
        isDefault: false,
        name: 'My Cover Page'
      }
    ]);

    const httpGetSpy = jest
      .spyOn(httpClient, 'get')
      .mockResolvedValue(mockListCoverPagesResponse);

    await expect(faxService.listCoverPages()).resolves.toEqual(
      mockListCoverPagesResponse
    );
    expect(httpGetSpy).toHaveBeenCalledWith('/fax/coverpages');
  });

  it('listCoverPages - should be able to handle system errors', async () => {
    const notifyreError = new NotifyreError('ERROR');

    jest.spyOn(httpClient, 'get').mockRejectedValue(notifyreError);

    await expect(faxService.listCoverPages()).rejects.toEqual(notifyreError);
  });

  it('listReceivedFaxes - should be able to return received faxes', async () => {
    const mockRequest: ListReceivedFaxesRequest = {
      toNumber: ''
    };
    const mockListCoverPagesResponse = new BaseResponse<
      ListReceivedFaxesResponse[]
    >(true, 200, 'OK', [
      {
        duration: 2399,
        from: '+61711111111',
        id: '85',
        pages: 1,
        read: false,
        status: 'completed',
        timestamp: 1637827359,
        to: '+61777777777'
      }
    ]);

    const httpGetSpy = jest
      .spyOn(httpClient, 'get')
      .mockResolvedValue(mockListCoverPagesResponse);

    await expect(faxService.listReceivedFaxes(mockRequest)).resolves.toEqual(
      mockListCoverPagesResponse
    );
    expect(httpGetSpy).toHaveBeenCalledWith('/fax/received', {
      params: mockRequest
    });
  });

  it('listReceivedFaxes - should be able to handle system errors', async () => {
    const mockRequest: ListReceivedFaxesRequest = {
      toNumber: ''
    };
    const notifyreError = new NotifyreError('ERROR');

    jest.spyOn(httpClient, 'get').mockRejectedValue(notifyreError);

    await expect(faxService.listReceivedFaxes(mockRequest)).rejects.toEqual(
      notifyreError
    );
  });

  it('downloadReceivedFax - should be able to return base64 string of received fax', async () => {
    const mockRequest = '85';
    const mockDownloadSentFaxResponse =
      new BaseResponse<DownloadReceivedFaxResponse>(true, 200, 'OK', {
          tiffBase64: 'dGVzdA==',
          type: 'application/pdf'
      });

    const httpGetSpy = jest
      .spyOn(httpClient, 'get')
      .mockResolvedValue(mockDownloadSentFaxResponse);

    await expect(faxService.downloadReceivedFax(mockRequest)).resolves.toEqual(
      mockDownloadSentFaxResponse
    );
    expect(httpGetSpy).toHaveBeenCalledWith(
      `/fax/received/${mockRequest}/download`
    );
  });

  it('downloadReceivedFax - should be able to handle system errors', async () => {
    const notifyreError = new NotifyreError('ERROR');
    jest.spyOn(httpClient, 'get').mockRejectedValue(notifyreError);

    await expect(faxService.downloadReceivedFax('85')).rejects.toEqual(
      notifyreError
    );
  });

  it('listFaxNumbers - should be able to return fax numbers', async () => {
    const mockListFaxNumbersResponse = {
      numbers: [
        {
          id: 9,
          countryCode: 61,
          region: 'Sydney',
          assignedNumber: 211111111,
          e164: '+61211111111',
          status: 'Active'
        }
      ]
    };

    const httpGetSpy = jest
      .spyOn(httpClient, 'get')
      .mockResolvedValue(mockListFaxNumbersResponse);

    await expect(faxService.listFaxNumbers()).resolves.toEqual(
      mockListFaxNumbersResponse
    );
    expect(httpGetSpy).toHaveBeenCalledWith('/fax/numbers');
  });

  it('listFaxNumbers - should be able to handle system errors', async () => {
    const notifyreError = new NotifyreError('ERROR');

    jest.spyOn(httpClient, 'get').mockRejectedValue(notifyreError);

    await expect(faxService.listFaxNumbers()).rejects.toEqual(notifyreError);
  });
});
