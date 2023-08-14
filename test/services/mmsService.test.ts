import axios, { AxiosInstance } from 'axios';
import { baseUrl, defaultVersion } from '../../src/config';
import { BaseResponse, NotifyreError } from '../../src/models';
import { errorInterceptor, responseInterceptor } from '../../src/utilities';
import { MmsService } from '../../src/services';
import { DownloadMmsReplyResponse } from '../../src/types';

describe('MmsService', () => {
  let httpClient: AxiosInstance;
  let mmsService: MmsService;

  beforeEach(() => {
    httpClient = axios.create({
      baseURL: `${baseUrl}/${defaultVersion}`,
      headers: {
        'x-api-token': '8817ac13-2b93-f11e-be86-6addca81156e',
        'user-agent': defaultVersion
      }
    });
    httpClient.interceptors.response.use(responseInterceptor, errorInterceptor);

    mmsService = new MmsService(httpClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(mmsService).toBeTruthy();
  });

  it('downloadMmsReply - should be able to download received mm', async () => {
    const mockDownloadMmsReplyResponse = new BaseResponse<DownloadMmsReplyResponse>(
      true,
      200,
      'OK',
      {
        documentList: [
          {
            base64Str: "kahfowef1i2h",
            type: "image/jpeg"
          }
        ]
      }
    );
    const mockRequest: string = 'a3a1f58f-c54b-4c49-a9ae-0e0f8f11550a';

    const httpGetSpy = jest
      .spyOn(httpClient, 'get')
      .mockResolvedValue(mockDownloadMmsReplyResponse);

    await expect(mmsService.downloadMmsReply(mockRequest)).resolves.toEqual(
      mockDownloadMmsReplyResponse
    );
    expect(httpGetSpy).toHaveBeenCalledWith(`/mms/received/${mockRequest}/download`);
  });

  it('downloadMmsReply - should be able to handle system errors', async () => {
    const notifyreError = new NotifyreError('ERROR');
    const mockRequest: string = 'a3a1f58f-c54b-4c49-a9ae-0e0f8f11550a';
    jest.spyOn(httpClient, 'get').mockRejectedValue(notifyreError);

    await expect(mmsService.downloadMmsReply(mockRequest)).rejects.toEqual(
      notifyreError
    );
  });
});
