import { NotifyreError } from '../src';
import { dateToTimestamp, verifySignature } from '../src/utilities';

describe('Utilities', () => {
  it('dateToTimestamp - should be able to return unix timestamp', () => {
    const inputDate = new Date();
    const timestamp = dateToTimestamp(inputDate);
    const timestampDate = new Date(timestamp * 1000);

    expect(timestamp).toBeGreaterThanOrEqual(0);
    expect(timestampDate.getUTCMonth()).toEqual(inputDate.getUTCMonth());
    expect(timestampDate.getUTCFullYear()).toEqual(inputDate.getUTCFullYear());
    expect(timestampDate.getUTCDate()).toEqual(inputDate.getUTCDate());
  });

  it('dateToTimestamp - should be able to return unix timestamp with minumum time', () => {
    const inputDate = new Date();
    const timestamp = dateToTimestamp(inputDate, false);
    const timestampDate = new Date(timestamp * 1000);

    expect(timestamp).toBeGreaterThanOrEqual(0);
    expect(timestampDate.getUTCHours()).toEqual(0);
    expect(timestampDate.getUTCMinutes()).toEqual(0);
    expect(timestampDate.getUTCSeconds()).toEqual(0);
  });

  it('dateToTimestamp - should be able to return unix timestamp with maximum time', () => {
    const inputDate = new Date();
    const timestamp = dateToTimestamp(inputDate, true);
    const timestampDate = new Date(timestamp * 1000);

    expect(timestamp).toBeGreaterThanOrEqual(0);
    expect(timestampDate.getUTCHours()).toEqual(23);
    expect(timestampDate.getUTCMinutes()).toEqual(59);
    expect(timestampDate.getUTCSeconds()).toEqual(59);
  });

  it('verifySignature - should be able to handle missing timestamp in signature header', () => {
    const signatureHeader =
      'v=30894d12c909722c603c3e301e0772ee20557d5359f39326ba702c817ca4703e';
    const signingSecret = 'ma4l4gtluqltoops28eh61tx4jgyturdwnie';
    const payload = {
      Event: 'fax_sent',
      Timestamp: 1634001867,
      Payload: {
        ID: 'cbf16f4b-d6b9-478c-afa2-c9a1d6ca41e1',
        RecipientID: 'f4da6acf-9024-4599-ab50-192ca6f6c98a',
        FromNumber: '+61771111111',
        To: '+61422677014',
        Reference: 'testing 1644',
        CreatedDateUtc: 1632617277,
        QueuedDateUtc: null,
        LastModifiedDateUtc: null,
        HighQuality: false,
        Pages: 3,
        Status: 'completed'
      }
    };
    const notifyreError = new NotifyreError('Empty signature timestamp');

    try {
      verifySignature(
        signatureHeader,
        payload,
        signingSecret,
        Number.MAX_SAFE_INTEGER
      );
    } catch (err) {
      expect(err).toEqual(notifyreError);
    }
  });

  it('verifySignature - should be able to handle missing signature in signature header', () => {
    const signatureHeader = 't=1634001867';
    const signingSecret = 'ma4l4gtluqltoops28eh61tx4jgyturdwnie';
    const payload = {
      Event: 'fax_sent',
      Timestamp: 1634001867,
      Payload: {
        ID: 'cbf16f4b-d6b9-478c-afa2-c9a1d6ca41e1',
        RecipientID: 'f4da6acf-9024-4599-ab50-192ca6f6c98a',
        FromNumber: '+61771111111',
        To: '+61422677014',
        Reference: 'testing 1644',
        CreatedDateUtc: 1632617277,
        QueuedDateUtc: null,
        LastModifiedDateUtc: null,
        HighQuality: false,
        Pages: 3,
        Status: 'completed'
      }
    };
    const notifyreError = new NotifyreError('Empty signature');

    try {
      verifySignature(
        signatureHeader,
        payload,
        signingSecret,
        Number.MAX_SAFE_INTEGER
      );
    } catch (err) {
      expect(err).toEqual(notifyreError);
    }
  });

  it('verifySignature - should be able to handle expired signature', () => {
    const signatureHeader =
      't=1634001867,v=30894d12c909722c603c3e301e0772ee20557d5359f39326ba702c817ca4703e';
    const signingSecret = 'ma4l4gtluqltoops28eh61tx4jgyturdwnie';
    const payload = {
      Event: 'fax_sent',
      Timestamp: 1634001867,
      Payload: {
        ID: 'cbf16f4b-d6b9-478c-afa2-c9a1d6ca41e1',
        RecipientID: 'f4da6acf-9024-4599-ab50-192ca6f6c98a',
        FromNumber: '+61771111111',
        To: '+61422677014',
        Reference: 'testing 1644',
        CreatedDateUtc: 1632617277,
        QueuedDateUtc: null,
        LastModifiedDateUtc: null,
        HighQuality: false,
        Pages: 3,
        Status: 'completed'
      }
    };

    const notifyreError = new NotifyreError('Signature timestamp expired');

    try {
      verifySignature(signatureHeader, payload, signingSecret);
    } catch (err) {
      expect(err).toEqual(notifyreError);
    }
  });

  it('verifySignature - should be able to invalid signature', () => {
    const signatureHeader =
      't=1634001867,v=299c1f006ec9d41b2ffe107bd5442ee2b40b3b75b880dbfc4672fc0cf1dbe528';
    const signingSecret = 'ma4l4gtluqltoops28eh61tx4jgyturdwnie';
    const payload = {
      Event: 'fax_sent',
      Timestamp: 1634001867,
      Payload: {
        ID: 'cbf16f4b-d6b9-478c-afa2-c9a1d6ca41e1',
        RecipientID: 'f4da6acf-9024-4599-ab50-192ca6f6c98a',
        FromNumber: '+61771111111',
        To: '+61422677014',
        Reference: 'testing 1644',
        CreatedDateUtc: 1632617277,
        QueuedDateUtc: null,
        LastModifiedDateUtc: null,
        HighQuality: false,
        Pages: 3,
        Status: 'completed'
      }
    };

    const notifyreError = new NotifyreError('Invalid signature');

    try {
      verifySignature(
        signatureHeader,
        payload,
        signingSecret,
        Number.MAX_SAFE_INTEGER
      );
    } catch (err) {
      expect(err).toEqual(notifyreError);
    }
  });

  it('verifySignature - should be able to verify signature', () => {
    const signatureHeader =
      't=1634001867,v=30894d12c909722c603c3e301e0772ee20557d5359f39326ba702c817ca4703e';
    const signingSecret = 'ma4l4gtluqltoops28eh61tx4jgyturdwnie';
    const payload = {
      Event: 'fax_sent',
      Timestamp: 1634001867,
      Payload: {
        ID: 'cbf16f4b-d6b9-478c-afa2-c9a1d6ca41e1',
        RecipientID: 'f4da6acf-9024-4599-ab50-192ca6f6c98a',
        FromNumber: '+61771111111',
        To: '+61422677014',
        Reference: 'testing 1644',
        CreatedDateUtc: 1632617277,
        QueuedDateUtc: null,
        LastModifiedDateUtc: null,
        HighQuality: false,
        Pages: 3,
        Status: 'completed'
      }
    };

    expect(
      verifySignature(
        signatureHeader,
        payload,
        signingSecret,
        Number.MAX_SAFE_INTEGER
      )
    ).toBeTruthy();
  });
});
