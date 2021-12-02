import axios, { AxiosInstance } from 'axios';
import { ContentType, FileType, RecipientType, Sort } from '../../src/constants';
import { baseUrl, defaultVersion } from '../../src/config';
import { BaseResponse, NotifyreError } from '../../src/models';
import { FaxService } from '../../src/services';
import {
  DownloadReceivedFaxResponse,
  DownloadSentFaxRequest,
  DownloadSentFaxResponse,
  ListCoverPagesResponse,
  ListReceivedFaxesResponse,
  ListReceivedFaxesRequest,
  ListSentFaxesRequest,
  ListSentFaxesResponse,
  SubmitFaxRequest,
  SubmitFaxResponse,
  UploadDocumentResponse
} from '../../src/types';
import { dateToTimestamp } from '../../src/utilities';

describe('FaxService', () => {
  let httpClient: AxiosInstance;
  let faxService: FaxService;

  beforeEach(() => {
    httpClient = axios.create({
      baseURL: `${baseUrl}/${defaultVersion}`,
      headers: {
        'x-api-token': '4e0add32-50fc-a6ab-10c3-f824d0769f7e',
        'user-agent': defaultVersion
      }
    });

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
            to: '+61291989589'
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
      .mockResolvedValue({ data: mockListSentFaxesResponse });

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
    const mockNotifyreErrorMessage = 'ERROR';
    const notifyreError = new NotifyreError(mockNotifyreErrorMessage);
    const mockRequest: ListSentFaxesRequest = {
      fromDate: new Date(),
      toDate: new Date(),
      sort: Sort.Descending,
      limit: 10
    };
    jest
      .spyOn(httpClient, 'get')
      .mockRejectedValue(new Error(mockNotifyreErrorMessage));

    await expect(faxService.listSentFaxes(mockRequest)).resolves.toEqual(
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
      sendFrom: '+61777777777',
      header: '',
      subject: '',
      scheduledDate: null
    };
    const mockUploadDocumentResponse = new BaseResponse<UploadDocumentResponse>(
      true,
      200,
      'OK',
      {
        fileID: '99dd6d59-d919-4744-b19b-3ce5d0cb780b',
        fileName: '4ca38d82-c82a-45da-8f28-62c198bec078'
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

    const httpPostSpy = jest
      .spyOn(httpClient, 'post')
      .mockResolvedValueOnce({ data: mockUploadDocumentResponse })
      .mockResolvedValue({ data: mockSubmitFaxResponse });

    await expect(faxService.submitFax(mockRequest)).resolves.toEqual(
      mockSubmitFaxResponse
    );
    expect(httpPostSpy).toHaveBeenNthCalledWith(
      1,
      '/fax/send/conversion',
      mockRequest.documents[0]
    );
    expect(httpPostSpy).toHaveBeenNthCalledWith(2, '/fax/send', {
      templateName: mockRequest.templateName,
      faxes: {
        clientReference: mockRequest.clientReference,
        files: [mockUploadDocumentResponse.payload?.fileID],
        header: mockRequest.header,
        isHighQuality: mockRequest.isHighQuality,
        recipients: mockRequest.recipients,
        scheduledDate: null,
        sendFrom: mockRequest.sendFrom,
        senderID: mockRequest.sendFrom,
        subject: mockRequest.subject
      }
    });
  });

  it('submitFax - should be able to submit scheduled fax', async () => {
    const scheduledDate = new Date(2021, 12, 31);
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
    const mockUploadDocumentResponse = new BaseResponse<UploadDocumentResponse>(
      true,
      200,
      'OK',
      {
        fileID: '99dd6d59-d919-4744-b19b-3ce5d0cb780b',
        fileName: '4ca38d82-c82a-45da-8f28-62c198bec078'
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

    const httpPostSpy = jest
      .spyOn(httpClient, 'post')
      .mockResolvedValueOnce({ data: mockUploadDocumentResponse })
      .mockResolvedValue({ data: mockSubmitFaxResponse });

    await expect(faxService.submitFax(mockRequest)).resolves.toEqual(
      mockSubmitFaxResponse
    );
    expect(httpPostSpy).toHaveBeenNthCalledWith(
      1,
      '/fax/send/conversion',
      mockRequest.documents[0]
    );
    expect(httpPostSpy).toHaveBeenNthCalledWith(2, '/fax/send', {
      templateName: mockRequest.templateName,
      faxes: {
        clientReference: mockRequest.clientReference,
        files: [mockUploadDocumentResponse.payload?.fileID],
        header: mockRequest.header,
        isHighQuality: mockRequest.isHighQuality,
        recipients: mockRequest.recipients,
        scheduledDate: dateToTimestamp(scheduledDate),
        sendFrom: mockRequest.sendFrom,
        senderID: mockRequest.sendFrom,
        subject: mockRequest.subject
      }
    });
  });

  it('submitFax - should be able to handle upload document error', async () => {
    const mockNotifyreErrorMessage = 'ERROR';
    const notifyreError = new NotifyreError(
      'The document upload process failed',
      400,
      [null, mockNotifyreErrorMessage]
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
    const mockUploadDocumentResponse = new BaseResponse<UploadDocumentResponse>(
      true,
      200,
      'OK',
      {
        fileID: '99dd6d59-d919-4744-b19b-3ce5d0cb780b',
        fileName: '4ca38d82-c82a-45da-8f28-62c198bec078'
      }
    );

    jest
      .spyOn(httpClient, 'post')
      .mockResolvedValueOnce({ data: mockUploadDocumentResponse })
      .mockRejectedValue(new Error(mockNotifyreErrorMessage));

    await expect(faxService.submitFax(mockRequest)).resolves.toEqual(
      notifyreError
    );
  });

  it('submitFax - should be able to handle system errors', async () => {
    const mockNotifyreErrorMessage = 'ERROR';
    const notifyreError = new NotifyreError(mockNotifyreErrorMessage);
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
      scheduledDate: null
    };
    const mockUploadDocumentResponse = new BaseResponse<UploadDocumentResponse>(
      true,
      200,
      'OK',
      {
        fileID: '99dd6d59-d919-4744-b19b-3ce5d0cb780b',
        fileName: '4ca38d82-c82a-45da-8f28-62c198bec078'
      }
    );

    jest
      .spyOn(httpClient, 'post')
      .mockResolvedValueOnce({ data: mockUploadDocumentResponse })
      .mockRejectedValue(new Error(mockNotifyreErrorMessage));

    await expect(faxService.submitFax(mockRequest)).resolves.toEqual(
      notifyreError
    );
  });

  it('downloadSentFax - should be able to return base64 string of sent fax', async () => {
    const mockRequest: DownloadSentFaxRequest = {
      id: 'ada2edec-e5e0-4ba4-bae8-a37a0e34becb',
      fileType: FileType.Pdf
    };
    const mockDownloadSentFaxResponse =
      new BaseResponse<DownloadSentFaxResponse>(true, 200, 'OK', {
        base64Str: 'dGVzdA=='
      });

    const httpGetSpy = jest
      .spyOn(httpClient, 'get')
      .mockResolvedValue({ data: mockDownloadSentFaxResponse });

    await expect(faxService.downloadSentFax(mockRequest)).resolves.toEqual(
      mockDownloadSentFaxResponse
    );
    expect(httpGetSpy).toHaveBeenCalledWith(
      `/fax/send/recipients/${mockRequest.id}/download`,
      {
        params: {
          fileType: mockRequest.fileType
        }
      }
    );
  });

  it('downloadSentFax - should be able to handle system errors', async () => {
    const mockNotifyreErrorMessage = 'ERROR';
    const notifyreError = new NotifyreError(mockNotifyreErrorMessage);
    const mockRequest: DownloadSentFaxRequest = {
      id: 'ada2edec-e5e0-4ba4-bae8-a37a0e34becb',
      fileType: FileType.Pdf
    };

    jest
      .spyOn(httpClient, 'get')
      .mockRejectedValue(new Error(mockNotifyreErrorMessage));

    await expect(faxService.downloadSentFax(mockRequest)).resolves.toEqual(
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
      .mockResolvedValue({ data: mockListCoverPagesResponse });

    await expect(faxService.listCoverPages()).resolves.toEqual(
      mockListCoverPagesResponse
    );
    expect(httpGetSpy).toHaveBeenCalledWith('/fax/coverpages');
  });

  it('listCoverPages - should be able to handle system errors', async () => {
    const mockNotifyreErrorMessage = 'ERROR';
    const notifyreError = new NotifyreError(mockNotifyreErrorMessage);

    jest
      .spyOn(httpClient, 'get')
      .mockRejectedValue(new Error(mockNotifyreErrorMessage));

    await expect(faxService.listCoverPages()).resolves.toEqual(notifyreError);
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
      .mockResolvedValue({ data: mockListCoverPagesResponse });

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
    const mockNotifyreErrorMessage = 'ERROR';
    const notifyreError = new NotifyreError(mockNotifyreErrorMessage);

    jest
      .spyOn(httpClient, 'get')
      .mockRejectedValue(new Error(mockNotifyreErrorMessage));

    await expect(faxService.listReceivedFaxes(mockRequest)).resolves.toEqual(
      notifyreError
    );
  });

  it('downloadReceivedFax - should be able to return base64 string of received fax', async () => {
    const mockRequest = '85';
    const mockDownloadSentFaxResponse =
      new BaseResponse<DownloadReceivedFaxResponse>(true, 200, 'OK', {
        tiffBase64: 'dGVzdA=='
      });

    const httpGetSpy = jest
      .spyOn(httpClient, 'get')
      .mockResolvedValue({ data: mockDownloadSentFaxResponse });

    await expect(faxService.downloadReceivedFax(mockRequest)).resolves.toEqual(
      mockDownloadSentFaxResponse
    );
    expect(httpGetSpy).toHaveBeenCalledWith(
      `/fax/received/${mockRequest}/download`
    );
  });

  it('downloadReceivedFax - should be able to handle system errors', async () => {
    const mockNotifyreErrorMessage = 'ERROR';
    const notifyreError = new NotifyreError(mockNotifyreErrorMessage);
    jest
      .spyOn(httpClient, 'get')
      .mockRejectedValue(new Error(mockNotifyreErrorMessage));

    await expect(faxService.downloadReceivedFax('85')).resolves.toEqual(
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
      .mockResolvedValue({ data: mockListFaxNumbersResponse });

    await expect(faxService.listFaxNumbers()).resolves.toEqual(
      mockListFaxNumbersResponse
    );
    expect(httpGetSpy).toHaveBeenCalledWith('/fax/numbers');
  });

  it('listFaxNumbers - should be able to handle system errors', async () => {
    const mockNotifyreErrorMessage = 'ERROR';
    const notifyreError = new NotifyreError(mockNotifyreErrorMessage);

    jest
      .spyOn(httpClient, 'get')
      .mockRejectedValue(new Error(mockNotifyreErrorMessage));

    await expect(faxService.listFaxNumbers()).resolves.toEqual(notifyreError);
  });
});
