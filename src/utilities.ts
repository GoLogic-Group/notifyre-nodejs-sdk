import { AxiosError, AxiosResponse } from 'axios';
import { createHmac } from 'crypto';
import { NotifyreError } from '.';

export const generateSignature = (message: string, key: string): string => {
  return createHmac('sha256', key).update(message).digest('hex');
};

export const verifySignature = (
  signatureHeader: string,
  payload: any,
  signingSecret: string,
  timeToleranceSec: number = 300
): boolean => {
  let timestamp = '';
  let signature = '';

  const elements = signatureHeader.split(',');

  elements.forEach((element) => {
    if (element.split('=')[0] == 't') {
      timestamp = element.split('=')[1];
    }
    if (element.split('=')[0] == 'v') {
      signature = element.split('=')[1];
    }
  });

  if (!timestamp) {
    throw new NotifyreError('Empty signature timestamp');
  }

  if (!signature) {
    throw new NotifyreError('Empty signature');
  }

  const timestamNow = new Date().getTime() / 1000;

  if (timestamNow - +timestamp > timeToleranceSec) {
    throw new NotifyreError('Signature timestamp expired');
  }

  const expectedSignature = generateSignature(
    `${timestamp}.${JSON.stringify(payload)}`,
    signingSecret
  );

  if (expectedSignature === signature) {
    return true;
  }

  throw new NotifyreError('Invalid signature');
};

export const responseInterceptor = (res: AxiosResponse) => {
  return res.data;
};

export const errorInterceptor = (res: AxiosError) => {
  if (res.response) {
    return Promise.reject(
      new NotifyreError(
        res.response.data.message,
        res.response.data.statusCode,
        res.response.data.errors
      )
    );
  } else {
    return Promise.reject(new NotifyreError(res.message));
  }
};
