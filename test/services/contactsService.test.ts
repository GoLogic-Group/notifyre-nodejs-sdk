import axios, { AxiosInstance } from 'axios';
import { baseUrl, defaultVersion } from '../../src/config';
import { Sort } from '../../src/constants';
import { BaseResponse, NotifyreError } from '../../src/models';
import { ContactsService } from '../../src/services';
import {
  AddContactsToGroupsRequest,
  AddContactsToGroupsResponse,
  CreateContactRequest,
  CreateContactResponse,
  deleteContactsResponse,
  DeleteGroupsResponse,
  GetContactResponse,
  CreateGroupResponse,
  ListContactsRequest,
  ListContactsResponse,
  ListGroupsRequest,
  ListGroupsResponse,
  RemoveContactsFromGroupRequest,
  RemoveContactsFromGroupResponse,
  UpdateContactRequest,
  UpdateContactResponse,
  UpdateGroupRequest,
  UpdateGroupResponse
} from '../../src/types';

describe('ContactsService', () => {
  let httpClient: AxiosInstance;
  let contactsService: ContactsService;

  beforeEach(() => {
    httpClient = axios.create({
      baseURL: `${baseUrl}/${defaultVersion}`,
      headers: {
        'x-api-token': '4e0add32-50fc-a6ab-10c3-f824d0769f7e',
        'user-agent': defaultVersion
      }
    });

    contactsService = new ContactsService(httpClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(contactsService).toBeTruthy();
  });

  it('listContacts - should be able to return list of contacts', async () => {
    const mockListContactsResponse = new BaseResponse<ListContactsResponse>(
      true,
      200,
      'OK',
      {
        contacts: [
          {
            createdDateUtc: 1631665697,
            customFields: [
              {
                id: 'b92b6e36-9cbb-4682-9f77-f035c1afc864',
                key: 'cf1',
                value: 'test'
              }
            ],
            email: 'testfax@mail.com',
            faxNumber: '+61411111111',
            firstName: 'test',
            fullName: 'test fax',
            groups: [
              {
                id: '1be1bffe-eba1-4693-91de-b3ca275179f9',
                name: 'test',
                createdDateUtc: 1635982170
              }
            ],
            id: 'd1c42731-f641-4a1c-be20-89d484708ca5',
            lastName: 'fax',
            mobileNumber: '+61411111111',
            organization: ''
          }
        ],
        total: 1
      }
    );
    const mockRequest: ListContactsRequest = {
      groupIds: [],
      limit: 10,
      page: 0,
      searchQuery: '',
      sortBy: 'name',
      sortDir: Sort.Descending,
      type: ''
    };

    const httpPostSpy = jest
      .spyOn(httpClient, 'post')
      .mockResolvedValue({ data: mockListContactsResponse });

    await expect(contactsService.listContacts(mockRequest)).resolves.toEqual(
      mockListContactsResponse
    );
    expect(httpPostSpy).toHaveBeenCalledWith(
      '/addressbook/contacts/search',
      mockRequest
    );
  });

  it('listContacts - should be able to handle system errors', async () => {
    const mockNotifyreErrorMessage = 'ERROR';
    const notifyreError = new NotifyreError(mockNotifyreErrorMessage);
    const mockRequest: ListContactsRequest = {
      groupIds: [],
      limit: 10,
      page: 0,
      searchQuery: '',
      sortBy: 'name',
      sortDir: Sort.Descending,
      type: ''
    };
    jest
      .spyOn(httpClient, 'post')
      .mockRejectedValue(new Error(mockNotifyreErrorMessage));

    await expect(contactsService.listContacts(mockRequest)).resolves.toEqual(
      notifyreError
    );
  });

  it('createContact - should be able to create contact', async () => {
    const mockCreateContactResponse = new BaseResponse<CreateContactResponse>(
      true,
      200,
      'OK',
      {
        createdDateUtc: 1631665697,
        customFields: [
          {
            id: 'b92b6e36-9cbb-4682-9f77-f035c1afc864',
            key: 'cf1',
            value: 'test'
          }
        ],
        email: 'testfax@mail.com',
        faxNumber: '+61411111111',
        firstName: 'test',
        fullName: 'test fax',
        groups: [
          {
            id: '1be1bffe-eba1-4693-91de-b3ca275179f9',
            name: 'test',
            createdDateUtc: 1635982170
          }
        ],
        id: 'd1c42731-f641-4a1c-be20-89d484708ca5',
        lastName: 'fax',
        mobileNumber: '+61411111111',
        organization: ''
      }
    );
    const mockRequest: CreateContactRequest = {
      customFields: [
        {
          key: 'cf1',
          value: 'test'
        }
      ],
      email: 'test@email.com',
      faxNumber: '+61711111111',
      firstName: 'test',
      groupName: null,
      groups: null,
      lastName: 'test',
      mobileNumber: '+61411111111',
      organization: 'test'
    };

    const httpPostSpy = jest
      .spyOn(httpClient, 'post')
      .mockResolvedValue({ data: mockCreateContactResponse });

    await expect(contactsService.createContact(mockRequest)).resolves.toEqual(
      mockCreateContactResponse
    );
    expect(httpPostSpy).toHaveBeenCalledWith(
      '/addressbook/contacts',
      mockRequest
    );
  });

  it('createContact - should be able to handle system errors', async () => {
    const mockNotifyreErrorMessage = 'ERROR';
    const notifyreError = new NotifyreError(mockNotifyreErrorMessage);
    const mockRequest: CreateContactRequest = {
      customFields: [
        {
          key: 'cf1',
          value: 'test'
        }
      ],
      email: 'test@email.com',
      faxNumber: '+61711111111',
      firstName: 'test',
      groupName: null,
      groups: null,
      lastName: 'test',
      mobileNumber: '+61411111111',
      organization: 'test'
    };
    jest
      .spyOn(httpClient, 'post')
      .mockRejectedValue(new Error(mockNotifyreErrorMessage));

    await expect(contactsService.createContact(mockRequest)).resolves.toEqual(
      notifyreError
    );
  });

  it('updateContact - should be able to update contact', async () => {
    const mockUpdateContactResponse = new BaseResponse<UpdateContactResponse>(
      true,
      200,
      'OK',
      {
        createdDateUtc: 1631665697,
        customFields: [
          {
            id: 'b92b6e36-9cbb-4682-9f77-f035c1afc864',
            key: 'cf1',
            value: 'test'
          }
        ],
        email: 'test@email.com',
        faxNumber: '+61411111111',
        firstName: 'test',
        fullName: 'test fax',
        groups: [
          {
            id: '1be1bffe-eba1-4693-91de-b3ca275179f9',
            name: 'test',
            createdDateUtc: 1635982170
          }
        ],
        id: 'd1c42731-f641-4a1c-be20-89d484708ca5',
        lastName: 'fax',
        mobileNumber: '+61411111111',
        organization: ''
      }
    );
    const mockRequest: UpdateContactRequest = {
      id: 'd1c42731-f641-4a1c-be20-89d484708ca5',
      customFields: [
        {
          key: 'cf1',
          value: 'test'
        }
      ],
      email: 'test@email.com',
      faxNumber: '+61711111111',
      firstName: 'test',
      lastName: 'test',
      mobileNumber: '+61411111111',
      organization: 'test'
    };

    const httpPutSpy = jest
      .spyOn(httpClient, 'put')
      .mockResolvedValue({ data: mockUpdateContactResponse });

    await expect(contactsService.updateContact(mockRequest)).resolves.toEqual(
      mockUpdateContactResponse
    );
    expect(httpPutSpy).toHaveBeenCalledWith(
      `/addressbook/contacts/${mockRequest.id}`,
      mockRequest
    );
  });

  it('updateContact - should be able to handle system errors', async () => {
    const mockNotifyreErrorMessage = 'ERROR';
    const notifyreError = new NotifyreError(mockNotifyreErrorMessage);
    const mockRequest: UpdateContactRequest = {
      id: '3e606260-698a-41d3-88f8-7323782e7e38',
      customFields: [
        {
          key: 'cf1',
          value: 'test'
        }
      ],
      email: 'test@mailinator.com',
      faxNumber: '+61711111111',
      firstName: 'test',
      lastName: 'test',
      mobileNumber: '+61411111111',
      organization: 'test'
    };
    jest
      .spyOn(httpClient, 'put')
      .mockRejectedValue(new Error(mockNotifyreErrorMessage));

    await expect(contactsService.updateContact(mockRequest)).resolves.toEqual(
      notifyreError
    );
  });

  it('deleteContacts - should be able to update contact', async () => {
    const mockDeleteContactsResponse = new BaseResponse<deleteContactsResponse>(
      true,
      200,
      'OK',
      {
        deleted: true
      }
    );
    const mockRequest: string[] = ['d1c42731-f641-4a1c-be20-89d484708ca5'];

    const httpDeleteSpy = jest
      .spyOn(httpClient, 'delete')
      .mockResolvedValue({ data: mockDeleteContactsResponse });

    await expect(contactsService.deleteContacts(mockRequest)).resolves.toEqual(
      mockDeleteContactsResponse
    );
    expect(httpDeleteSpy).toHaveBeenCalledWith('/addressbook/contacts', {
      data: { contacts: mockRequest }
    });
  });

  it('deleteContacts - should be able to handle system errors', async () => {
    const mockNotifyreErrorMessage = 'ERROR';
    const notifyreError = new NotifyreError(mockNotifyreErrorMessage);
    const mockRequest: string[] = ['d1c42731-f641-4a1c-be20-89d484708ca5'];
    jest
      .spyOn(httpClient, 'delete')
      .mockRejectedValue(new Error(mockNotifyreErrorMessage));

    await expect(contactsService.deleteContacts(mockRequest)).resolves.toEqual(
      notifyreError
    );
  });

  it('getContact - should be able to get contact details', async () => {
    const mockGetContactResponse = new BaseResponse<GetContactResponse>(
      true,
      200,
      'OK',
      {
        createdDateUtc: 1631665697,
        customFields: [
          {
            id: 'b92b6e36-9cbb-4682-9f77-f035c1afc864',
            key: 'cf1',
            value: 'test'
          }
        ],
        email: 'test@email.com',
        faxNumber: '+61411111111',
        firstName: 'test',
        fullName: 'test fax',
        groups: [
          {
            id: '1be1bffe-eba1-4693-91de-b3ca275179f9',
            name: 'test',
            createdDateUtc: 1635982170
          }
        ],
        id: 'd1c42731-f641-4a1c-be20-89d484708ca5',
        lastName: 'fax',
        mobileNumber: '+61411111111',
        organization: ''
      }
    );
    const mockRequest: string = 'd1c42731-f641-4a1c-be20-89d484708ca5';

    const httpGetSpy = jest
      .spyOn(httpClient, 'get')
      .mockResolvedValue({ data: mockGetContactResponse });

    await expect(contactsService.getContact(mockRequest)).resolves.toEqual(
      mockGetContactResponse
    );
    expect(httpGetSpy).toHaveBeenCalledWith(
      `/addressbook/contacts/${mockRequest}`
    );
  });

  it('getContact - should be able to handle system errors', async () => {
    const mockNotifyreErrorMessage = 'ERROR';
    const notifyreError = new NotifyreError(mockNotifyreErrorMessage);
    const mockRequest: string = 'd1c42731-f641-4a1c-be20-89d484708ca5';
    jest
      .spyOn(httpClient, 'get')
      .mockRejectedValue(new Error(mockNotifyreErrorMessage));

    await expect(contactsService.getContact(mockRequest)).resolves.toEqual(
      notifyreError
    );
  });

  it('addContactsToGroups - should be able to add contacts to groups', async () => {
    const mockAddContactsToGroupsResponse =
      new BaseResponse<AddContactsToGroupsResponse>(true, 200, 'OK', {
        added: true
      });
    const mockRequest: AddContactsToGroupsRequest = {
      contacts: ['4a294618-7caa-4ab9-9def-174eda370758'],
      groups: ['b9e7dd2d-8c42-4fb4-bf95-a5080d6d6e27']
    };

    const httpPostSpy = jest
      .spyOn(httpClient, 'post')
      .mockResolvedValue({ data: mockAddContactsToGroupsResponse });

    await expect(
      contactsService.addContactsToGroups(mockRequest)
    ).resolves.toEqual(mockAddContactsToGroupsResponse);
    expect(httpPostSpy).toHaveBeenCalledWith(
      '/addressbook/groups/contacts',
      mockRequest
    );
  });

  it('addContactsToGroups - should be able to handle system errors', async () => {
    const mockNotifyreErrorMessage = 'ERROR';
    const notifyreError = new NotifyreError(mockNotifyreErrorMessage);
    const mockRequest: AddContactsToGroupsRequest = {
      contacts: ['a294618-7caa-4ab9-9def-174eda370758'],
      groups: ['1be1bffe-eba1-4693-91de-b3ca275179f9']
    };
    jest
      .spyOn(httpClient, 'post')
      .mockRejectedValue(new Error(mockNotifyreErrorMessage));

    await expect(
      contactsService.addContactsToGroups(mockRequest)
    ).resolves.toEqual(notifyreError);
  });

  it('removeContactsFromGroup - should be able to remove contacts from group', async () => {
    const mockAddContactsToGroupsResponse =
      new BaseResponse<RemoveContactsFromGroupResponse>(true, 200, 'OK', {
        removed: true
      });
    const mockRequest: RemoveContactsFromGroupRequest = {
      contacts: ['3e606260-698a-41d3-88f8-7323782e7e38'],
      groupID: '1be1bffe-eba1-4693-91de-b3ca275179f9'
    };

    const httpDeleteSpy = jest
      .spyOn(httpClient, 'delete')
      .mockResolvedValue({ data: mockAddContactsToGroupsResponse });

    await expect(
      contactsService.removeContactsFromGroup(mockRequest)
    ).resolves.toEqual(mockAddContactsToGroupsResponse);
    expect(httpDeleteSpy).toHaveBeenCalledWith('/addressbook/groups/contacts', {
      data: mockRequest
    });
  });

  it('removeContactsFromGroup - should be able to handle system errors', async () => {
    const mockNotifyreErrorMessage = 'ERROR';
    const notifyreError = new NotifyreError(mockNotifyreErrorMessage);
    const mockRequest: RemoveContactsFromGroupRequest = {
      contacts: ['3e606260-698a-41d3-88f8-7323782e7e38'],
      groupID: 'be1bffe-eba1-4693-91de-b3ca275179f9'
    };
    jest
      .spyOn(httpClient, 'delete')
      .mockRejectedValue(new Error(mockNotifyreErrorMessage));

    await expect(
      contactsService.removeContactsFromGroup(mockRequest)
    ).resolves.toEqual(notifyreError);
  });

  it('listGroups - should be able to return list of groups', async () => {
    const mockListGroupsResponse = new BaseResponse<ListGroupsResponse>(
      true,
      200,
      'OK',
      {
        groups: [
          {
            contactsCount: 1,
            createdDateUtc: 1635982170,
            id: '1be1bffe-eba1-4693-91de-b3ca275179f9',
            name: 'test'
          }
        ]
      }
    );
    const mockRequest: ListGroupsRequest = {
      searchQuery: '',
      sortBy: 'name',
      sortDir: Sort.Descending
    };

    const httpGetSpy = jest
      .spyOn(httpClient, 'get')
      .mockResolvedValue({ data: mockListGroupsResponse });

    await expect(contactsService.listGroups(mockRequest)).resolves.toEqual(
      mockListGroupsResponse
    );
    expect(httpGetSpy).toHaveBeenCalledWith('/addressbook/groups', {
      params: mockRequest
    });
  });

  it('listGroups - should be able to handle system errors', async () => {
    const mockNotifyreErrorMessage = 'ERROR';
    const notifyreError = new NotifyreError(mockNotifyreErrorMessage);
    const mockRequest: ListGroupsRequest = {
      searchQuery: '',
      sortBy: 'name',
      sortDir: Sort.Descending
    };
    jest
      .spyOn(httpClient, 'get')
      .mockRejectedValue(new Error(mockNotifyreErrorMessage));

    await expect(contactsService.listGroups(mockRequest)).resolves.toEqual(
      notifyreError
    );
  });

  it('createGroup - should be able to create group', async () => {
    const mockListGroupsResponse = new BaseResponse<CreateGroupResponse>(
      true,
      200,
      'OK',
      {
        createdDateUtc: 1638172063,
        id: '72a6d4c5-f30d-412b-bc96-97074fef4b5d',
        name: 'test'
      }
    );
    const mockRequest: string = 'test';

    const httpPostSpy = jest
      .spyOn(httpClient, 'post')
      .mockResolvedValue({ data: mockListGroupsResponse });

    await expect(contactsService.createGroup(mockRequest)).resolves.toEqual(
      mockListGroupsResponse
    );
    expect(httpPostSpy).toHaveBeenCalledWith('/addressbook/groups', {
      name: mockRequest
    });
  });

  it('createGroup - should be able to handle system errors', async () => {
    const mockNotifyreErrorMessage = 'ERROR';
    const notifyreError = new NotifyreError(mockNotifyreErrorMessage);
    const mockRequest: string = 'test';
    jest
      .spyOn(httpClient, 'post')
      .mockRejectedValue(new Error(mockNotifyreErrorMessage));

    await expect(contactsService.createGroup(mockRequest)).resolves.toEqual(
      notifyreError
    );
  });

  it('updateGroup - should be able to update group', async () => {
    const mockUpdateGroupRequest = new BaseResponse<UpdateGroupResponse>(
      true,
      200,
      'OK',
      {
        createdDateUtc: 1638172063,
        id: '72a6d4c5-f30d-412b-bc96-97074fef4b5d',
        name: 'test'
      }
    );
    const mockRequest: UpdateGroupRequest = {
      id: '22ffb7cb-decf-455e-8834-70870d544dd5',
      name: 'test'
    };

    const httpPutSpy = jest
      .spyOn(httpClient, 'put')
      .mockResolvedValue({ data: mockUpdateGroupRequest });

    await expect(contactsService.updateGroup(mockRequest)).resolves.toEqual(
      mockUpdateGroupRequest
    );
    expect(httpPutSpy).toHaveBeenCalledWith(
      `/addressbook/groups/${mockRequest.id}`,
      { name: mockRequest.name }
    );
  });

  it('updateGroup - should be able to handle system errors', async () => {
    const mockNotifyreErrorMessage = 'ERROR';
    const notifyreError = new NotifyreError(mockNotifyreErrorMessage);
    const mockRequest: UpdateGroupRequest = {
      id: '22ffb7cb-decf-455e-8834-70870d544dd5',
      name: 'test'
    };
    jest
      .spyOn(httpClient, 'put')
      .mockRejectedValue(new Error(mockNotifyreErrorMessage));

    await expect(contactsService.updateGroup(mockRequest)).resolves.toEqual(
      notifyreError
    );
  });

  it('deleteGroups - should be able to delete groups', async () => {
    const mockDeleteGroupsResponse = new BaseResponse<DeleteGroupsResponse>(
      true,
      200,
      'OK',
      {
        deleted: true
      }
    );
    const mockRequest: string[] = ['72a6d4c5-f30d-412b-bc96-97074fef4b5d'];

    const httpDeleteSpy = jest
      .spyOn(httpClient, 'delete')
      .mockResolvedValue({ data: mockDeleteGroupsResponse });

    await expect(contactsService.deleteGroups(mockRequest)).resolves.toEqual(
      mockDeleteGroupsResponse
    );
    expect(httpDeleteSpy).toHaveBeenCalledWith(`/addressbook/groups`, {
      data: { groups: mockRequest }
    });
  });

  it('deleteGroups - should be able to handle system errors', async () => {
    const mockNotifyreErrorMessage = 'ERROR';
    const notifyreError = new NotifyreError(mockNotifyreErrorMessage);
    const mockRequest: string[] = ['72a6d4c5-f30d-412b-bc96-97074fef4b5d'];
    jest
      .spyOn(httpClient, 'delete')
      .mockRejectedValue(new Error(mockNotifyreErrorMessage));

    await expect(contactsService.deleteGroups(mockRequest)).resolves.toEqual(
      notifyreError
    );
  });
});
