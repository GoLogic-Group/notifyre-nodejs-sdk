import { NotifyreAPI } from '../src';
import { ContactsService, FaxService, SmsService } from '../src/services';

describe('NotifyreAPI', () => {
  let notifyreAPI: NotifyreAPI;

  beforeAll(() => {
    notifyreAPI = new NotifyreAPI('apiKey');
  });

  it('should be able to return Fax Service instance', () => {
    const faxService = notifyreAPI.getFaxService();

    expect(faxService).toBeTruthy();
    expect(faxService).toBeInstanceOf(FaxService);
  });

  it('should be able to return Sms Service instance', () => {
    const smsSevice = notifyreAPI.getSmsService();

    expect(smsSevice).toBeTruthy();
    expect(smsSevice).toBeInstanceOf(SmsService);
  });

  it('should be able to return Contacts Service instance', () => {
    const contactsService = notifyreAPI.getContactsService();

    expect(contactsService).toBeTruthy();
    expect(contactsService).toBeInstanceOf(ContactsService);
  });
});
