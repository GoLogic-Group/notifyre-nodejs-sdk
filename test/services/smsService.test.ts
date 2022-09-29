import axios, { AxiosInstance } from 'axios';
import { RecipientType, Sort } from '../../src/constants';
import { baseUrl, defaultVersion } from '../../src/config';
import { BaseResponse, NotifyreError } from '../../src/models';
import { SmsService } from '../../src/services';
import {
  GetSmsReplyResponse,
  GetSmsResponse,
  GetSmsRecipientRequest,
  GetSmsRecipientResponse,
  ListSmsNumbersResponse,
  ListSentSmsRequest,
  ListSentSmsResponse,
  ListSmsRepliesRequest,
  ListSmsRepliesResponse,
  SubmitSmsRequest,
  SubmitSmsResponse
} from '../../src/types';
import {
  dateToTimestamp,
  errorInterceptor,
  responseInterceptor
} from '../../src/utilities';

describe('SmsService', () => {
  let httpClient: AxiosInstance;
  let smsService: SmsService;

  beforeEach(() => {
    httpClient = axios.create({
      baseURL: `${baseUrl}/${defaultVersion}`,
      headers: {
        'x-api-token': '8817ac13-2b93-f11e-be86-6addca81156e',
        'user-agent': defaultVersion
      }
    });
    httpClient.interceptors.response.use(responseInterceptor, errorInterceptor);

    smsService = new SmsService(httpClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(smsService).toBeTruthy();
  });

  it('listSentSms - should be able to return list of sent sms', async () => {
    const mockListSentSmsResponse = new BaseResponse<ListSentSmsResponse>(
      true,
      200,
      'OK',
      {
        smsMessages: [
          {
            accountID: 'KQNJ90KA',
            completedDateUtc: null,
            createdBy: '03529753-bb63-4b6f-917d-c5a769b7442a',
            createdDateUtc: 1631236194,
            friendlyID: 'MTMYPLORQYTY',
            id: 'dea3713b-8d47-4893-9290-633d67a1b304',
            lastModifiedDateUtc: 1631236195,
            recipient: {
              completedDateUtc: null,
              cost: 0.06,
              costPerPart: 0.06,
              fromNumber: 'Shared Number ()',
              id: 'fb4bbcd8-e172-4fc1-a144-3c80928fd72e',
              messageParts: 1,
              queuedDateUtc: 1631236195,
              status: 'queued',
              toNumber: '+639167074534',
              statusMessage: '',
            },
            status: 'queued',
            submittedDateUtc: 1631236195,
            totalCost: 6
          }
        ],
        total: 5
      }
    );
    const fromDate = new Date(2021, 9, 1);
    const toDate = new Date(2021, 12, 1);
    const mockRequest: ListSentSmsRequest = {
      fromDate,
      toDate,
      sort: Sort.Descending,
      limit: 10,
      skip: 1
    };

    const httpGetSpy = jest
      .spyOn(httpClient, 'get')
      .mockResolvedValue(mockListSentSmsResponse);

    await expect(smsService.listSentSms(mockRequest)).resolves.toEqual(
      mockListSentSmsResponse
    );
    expect(httpGetSpy).toHaveBeenCalledWith('/sms/send', {
      params: {
        fromDate: dateToTimestamp(mockRequest.fromDate, false),
        toDate: dateToTimestamp(mockRequest.toDate, true),
        sort: mockRequest.sort,
        limit: mockRequest.limit,
        skip: mockRequest.skip
      }
    });
  });

  it('listSentSms - should be able to handle system errors', async () => {
    const notifyreError = new NotifyreError('ERROR');
    const mockRequest: ListSentSmsRequest = {
      fromDate: new Date(),
      toDate: new Date(),
      sort: Sort.Descending,
      limit: 10,
      skip: 1
    };
    jest.spyOn(httpClient, 'get').mockRejectedValue(notifyreError);

    await expect(smsService.listSentSms(mockRequest)).rejects.toEqual(
      notifyreError
    );
  });

  it('submitSms - should be able to submit sms', async () => {
    const mockRequest: SubmitSmsRequest = {
      body: 'test',
      from: '',
      recipients: [{ type: RecipientType.SmsNumber, value: '+61444444444' }],
      scheduledDate: null,
      optOutMessage: true,
      addUnsubscribeLink: true,
      metadata: {
        "test": "test1"
      },
      callbackUrl: "https://google.com",
      callbackFormat: "notifyre"
    };
    const mockSubmitSmsResponse: SubmitSmsResponse = {
      friendlyID: 'DBYZD9PAWPL5',
      invalidToNumbers: null,
      smsMessageID: '6f588a61-91ee-4f5d-9194-05fab03cde8b'
    };

    const httpPostSpy = jest
      .spyOn(httpClient, 'post')
      .mockResolvedValue(mockSubmitSmsResponse);

    await expect(smsService.submitSms(mockRequest)).resolves.toEqual(
      mockSubmitSmsResponse
    );
    expect(httpPostSpy).toHaveBeenCalledWith('/sms/send', {
      body: 'test',
      from: '',
      recipients: [{ type: RecipientType.SmsNumber, value: '+61444444444' }],
      scheduledDate: null,
      optOutMessage: true,
      addUnsubscribeLink: true,
      metadata: {
        "test": "test1"
      },
      callbackUrl: "https://google.com",
      callbackFormat: "notifyre",
      apiVersion: defaultVersion
    });
  });

  it('submitSms - should be able to submit scheduled sms', async () => {
    const scheduledDate = new Date();
    scheduledDate.setFullYear(scheduledDate.getFullYear() + 1);
    const mockRequest: SubmitSmsRequest = {
      body: 'test',
      from: '',
      recipients: [{ type: RecipientType.SmsNumber, value: '+61444444444' }],
      scheduledDate,
      optOutMessage: false,
      addUnsubscribeLink: true,
      metadata: {
        "test": "test1"
      },
      callbackUrl: "https://google.com"
    };
    const mockSubmitSmsResponse: SubmitSmsResponse = {
      friendlyID: 'DBYZD9PAWPL5',
      invalidToNumbers: null,
      smsMessageID: '6f588a61-91ee-4f5d-9194-05fab03cde8b'
    };

    const httpPostSpy = jest
      .spyOn(httpClient, 'post')
      .mockResolvedValue(mockSubmitSmsResponse);

    await expect(smsService.submitSms(mockRequest)).resolves.toEqual(
      mockSubmitSmsResponse
    );
    expect(httpPostSpy).toHaveBeenCalledWith('/sms/send', {
      body: mockRequest.body,
      recipients: mockRequest.recipients,
      from: mockRequest.from,
      scheduledDate: dateToTimestamp(scheduledDate),
      optOutMessage: mockRequest.optOutMessage,
      addUnsubscribeLink: mockRequest.addUnsubscribeLink,
      metadata: {
        "test": "test1"
      },
      callbackUrl: "https://google.com",
      callbackFormat: "notifyre",
      apiVersion: defaultVersion
    });
  });

  it('submitSms - should be able to handle system errors', async () => {
    const mockRequest: SubmitSmsRequest = {
      body: 'test',
      from: '+61411111111',
      recipients: [{ type: RecipientType.SmsNumber, value: '+61444444444' }],
      scheduledDate: null,
      optOutMessage: true,
      addUnsubscribeLink: true
    };
    const notifyreError = new NotifyreError('ERROR');

    jest.spyOn(httpClient, 'post').mockRejectedValue(notifyreError);

    await expect(smsService.submitSms(mockRequest)).rejects.toEqual(
      notifyreError
    );
  });

  it('getSms - should be able to return sent sms details', async () => {
    const mockRequest: string = '0a5c9565-bba2-4406-96df-d9ffd85b2830';
    
    const mockGetSmsResponse: GetSmsResponse = {
      accountID: 'KQNJ90KA',
      completedDateUtc: null,
      createdBy: '03529753-bb63-4b6f-917d-c5a769b7442a',
      createdDateUtc: 1631236194,
      friendlyID: 'MTMYPLORQYTY',
      id: 'dea3713b-8d47-4893-9290-633d67a1b304',
      lastModifiedDateUtc: 1631236195,
      recipients: [{
        completedDateUtc: 1631236195,
        cost: 0.06,
        costPerPart: 0.06,
        fromNumber: 'Shared Number ()',
        id: 'fb4bbcd8-e172-4fc1-a144-3c80928fd72e',
        messageParts: 1,
        queuedDateUtc: 1631236195,
        status: 'queued',
        toNumber: '+639167074534',
        statusMessage:'',
      }],
      submittedDateUtc: 1631236195
    };

    const httpGetSpy = jest
      .spyOn(httpClient, 'get')
      .mockResolvedValue(mockGetSmsResponse);

    await expect(smsService.getSms(mockRequest)).resolves.toEqual(
      mockGetSmsResponse
    );
    expect(httpGetSpy).toHaveBeenCalledWith(
      `/sms/send/${mockRequest}`
    );
  });

  it('getSms - should be able to handle system errors', async () => {
    const mockRequest: string = '0a5c9565-bba2-4406-96df-d9ffd85b2830';
    const notifyreError = new NotifyreError('ERROR');

    jest.spyOn(httpClient, 'get').mockRejectedValue(notifyreError);

    await expect(smsService.getSms(mockRequest)).rejects.toEqual(notifyreError);
  });

  it('getSmsRecipient - should be able to return sent sms details', async () => {
    const mockRequest: GetSmsRecipientRequest = {
      messageID: '0a5c9565-bba2-4406-96df-d9ffd85b2830',
      recipientID: '6a5d0164-2eb3-4cfb-9bf5-f4fc5682faf4'
    };
    const mockGetSmsResponse: GetSmsRecipientResponse = {
      accountID: 'KQNJ90KA',
      completedDateUtc: null,
      createdBy: '03529753-bb63-4b6f-917d-c5a769b7442a',
      createdDateUtc: 1631236194,
      friendlyID: 'MTMYPLORQYTY',
      id: 'dea3713b-8d47-4893-9290-633d67a1b304',
      lastModifiedDateUtc: 1631236195,
      recipient: {
        completedDateUtc: null,
        cost: 0.06,
        costPerPart: 0.06,
        fromNumber: 'Shared Number ()',
        id: 'fb4bbcd8-e172-4fc1-a144-3c80928fd72e',
        messageParts: 1,
        queuedDateUtc: 1631236195,
        status: 'queued',
        toNumber: '+639167074534',
        statusMessage:'',
        message:'sample message'
      },
      status: 'queued',
      submittedDateUtc: 1631236195,
      totalCost: 6
    };

    const httpGetSpy = jest
      .spyOn(httpClient, 'get')
      .mockResolvedValue(mockGetSmsResponse);

    await expect(smsService.getSmsRecipientMessage(mockRequest)).resolves.toEqual(
      mockGetSmsResponse
    );
    expect(httpGetSpy).toHaveBeenCalledWith(
      `/sms/send/${mockRequest.messageID}/recipients/${mockRequest.recipientID}`
    );
  });

  it('getSmsRecipient - should be able to handle system errors', async () => {
    const mockRequest: GetSmsRecipientRequest = {
      messageID: '0a5c9565-bba2-4406-96df-d9ffd85b2830',
      recipientID: '6a5d0164-2eb3-4cfb-9bf5-f4fc5682faf4'
    };
    const notifyreError = new NotifyreError('ERROR');

    jest.spyOn(httpClient, 'get').mockRejectedValue(notifyreError);

    await expect(smsService.getSmsRecipientMessage(mockRequest)).rejects.toEqual(notifyreError);
  });

  it('listSmsReplies - should be able to return list of received sms', async () => {
    const mockListSmsRepliesResponse = new BaseResponse<ListSmsRepliesResponse>(
      true,
      200,
      'OK',
      {
        smsReplies: [
          {
            recipientID: '03529753-bb63-4b6f-917d-c5a769b7442a',
            recipientNumber: '+61411111111',
            senderNumber: '+61444444444',
            replyID: 'dea3713b-8d47-4893-9290-633d67a1b304',
            message: 'test',
            receivedDateUtc: 1631236195,
            contactDetails: null
          }
        ],
        total: 5
      }
    );
    const fromDate = new Date(2021, 9, 1);
    const toDate = new Date(2021, 12, 1);
    const mockRequest: ListSmsRepliesRequest = {
      fromDate,
      toDate,
      sort: Sort.Descending,
      limit: 10,
      skip: 1
    };

    const httpGetSpy = jest
      .spyOn(httpClient, 'get')
      .mockResolvedValue(mockListSmsRepliesResponse);

    await expect(smsService.listSmsReplies(mockRequest)).resolves.toEqual(
      mockListSmsRepliesResponse
    );
    expect(httpGetSpy).toHaveBeenCalledWith('/sms/received', {
      params: {
        fromDate: dateToTimestamp(mockRequest.fromDate, false),
        toDate: dateToTimestamp(mockRequest.toDate, true),
        sort: mockRequest.sort,
        limit: mockRequest.limit,
        skip: mockRequest.skip
      }
    });
  });

  it('listSmsReplies - should be able to handle system errors', async () => {
    const notifyreError = new NotifyreError('ERROR');
    const mockRequest: ListSmsRepliesRequest = {
      fromDate: new Date(),
      toDate: new Date(),
      sort: Sort.Descending,
      limit: 10,
      skip: 1
    };
    jest.spyOn(httpClient, 'get').mockRejectedValue(notifyreError);

    await expect(smsService.listSmsReplies(mockRequest)).rejects.toEqual(
      notifyreError
    );
  });

  it('getSmsReply - should be able to return received sms details', async () => {
    const mockGetSmsReplyResponse = new BaseResponse<GetSmsReplyResponse>(
      true,
      200,
      'OK',
      {
        contactDetails: null,
        message: 'test reply',
        receivedDateUtc: 1626255715,
        recipientID: 'bd7906a5-f161-4be0-ad30-634b7238df32',
        recipientNumber: '+61411111111',
        replyID: '80f7e81a-0769-44fb-a0f7-0bd778655914',
        senderNumber: '+61444444444'
      }
    );
    const mockRequest: string = 'a3a1f58f-c54b-4c49-a9ae-0e0f8f11550a';

    const httpGetSpy = jest
      .spyOn(httpClient, 'get')
      .mockResolvedValue(mockGetSmsReplyResponse);

    await expect(smsService.getSmsReply(mockRequest)).resolves.toEqual(
      mockGetSmsReplyResponse
    );
    expect(httpGetSpy).toHaveBeenCalledWith(`/sms/received/${mockRequest}`);
  });

  it('getSmsReply - should be able to handle system errors', async () => {
    const notifyreError = new NotifyreError('ERROR');
    const mockRequest: string = 'a3a1f58f-c54b-4c49-a9ae-0e0f8f11550a';
    jest.spyOn(httpClient, 'get').mockRejectedValue(notifyreError);

    await expect(smsService.getSmsReply(mockRequest)).rejects.toEqual(
      notifyreError
    );
  });

  it('listSmsNumbers - should be able to return list of sms numbers', async () => {
    const mockListSmsNumbersResponse = new BaseResponse<ListSmsNumbersResponse>(
      true,
      200,
      'OK',
      {
        smsNumbers: [
          {
            assignedNumber: 9167074534,
            countryCode: 63,
            createdDateUtc: null,
            e164: '+639167074534',
            finishDateUtc: 1639553141,
            id: 'd06192c1-b360-4fdf-aa55-3398b7fafad6',
            lastModifiedDateUtc: 1636962263,
            provider: 'test',
            startDateUtc: 1638190800,
            status: 'deactivated',
            subscriptionID: '61920b76044b80d8443f6964'
          }
        ],
        smsSenderIds: [
          {
            createdDateUtc: 1630564128,
            id: '4dbaf2df-d41c-4616-8a3d-eef3c5a63ce4',
            lastModifiedDateUtc: 1630564128,
            name: 'testsender',
            status: 'active'
          }
        ]
      }
    );

    const httpGetSpy = jest
      .spyOn(httpClient, 'get')
      .mockResolvedValue(mockListSmsNumbersResponse);

    await expect(smsService.listSmsNumbers()).resolves.toEqual(
      mockListSmsNumbersResponse
    );
    expect(httpGetSpy).toHaveBeenCalledWith('/sms/numbers');
  });

  it('listSmsNumbers - should be able to handle system errors', async () => {
    const notifyreError = new NotifyreError('ERROR');
    jest.spyOn(httpClient, 'get').mockRejectedValue(notifyreError);

    await expect(smsService.listSmsNumbers()).rejects.toEqual(notifyreError);
  });
});
