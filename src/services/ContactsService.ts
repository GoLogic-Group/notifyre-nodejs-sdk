import { AxiosInstance } from 'axios';
import {
  AddContactsToGroupsRequest,
  AddContactsToGroupsResponse,
  CreateContactRequest,
  CreateContactResponse,
  CreateGroupResponse,
  deleteContactsResponse,
  DeleteGroupsRequest,
  DeleteGroupsResponse,
  GetContactResponse,
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
} from '..';
import { BaseResponse } from '../models';

export class ContactsService {
  private basePath = '/addressbook';

  constructor(private httpClient: AxiosInstance) {}

  listContacts(
    request: ListContactsRequest
  ): Promise<BaseResponse<ListContactsResponse>> {
    return this.httpClient.post(`${this.basePath}/contacts/search`, request);
  }

  createContact(
    request: CreateContactRequest
  ): Promise<BaseResponse<CreateContactResponse>> {
    return this.httpClient.post(`${this.basePath}/contacts`, request);
  }

  updateContact(
    request: UpdateContactRequest
  ): Promise<BaseResponse<UpdateContactResponse>> {
    return this.httpClient.put(
      `${this.basePath}/contacts/${request.id}`,
      request
    );
  }

  deleteContacts(
    contacts: string[]
  ): Promise<BaseResponse<deleteContactsResponse>> {
    return this.httpClient.delete(`${this.basePath}/contacts`, {
      data: { contacts }
    });
  }

  getContact(id: string): Promise<BaseResponse<GetContactResponse>> {
    return this.httpClient.get(`${this.basePath}/contacts/${id}`);
  }

  addContactsToGroups(
    request: AddContactsToGroupsRequest
  ): Promise<BaseResponse<AddContactsToGroupsResponse>> {
    return this.httpClient.post(`${this.basePath}/groups/contacts`, request);
  }

  removeContactsFromGroup(
    request: RemoveContactsFromGroupRequest
  ): Promise<BaseResponse<RemoveContactsFromGroupResponse>> {
    return this.httpClient.delete(`${this.basePath}/groups/contacts`, {
      data: request
    });
  }

  listGroups(
    request: ListGroupsRequest
  ): Promise<BaseResponse<ListGroupsResponse>> {
    return this.httpClient.get(`${this.basePath}/groups`, {
      params: request
    });
  }

  createGroup(name: string): Promise<BaseResponse<CreateGroupResponse>> {
    return this.httpClient.post(`${this.basePath}/groups`, {
      name
    });
  }

  updateGroup(
    request: UpdateGroupRequest
  ): Promise<BaseResponse<UpdateGroupResponse>> {
    return this.httpClient.put(`${this.basePath}/groups/${request.id}`, {
      name: request.name
    });
  }

  deleteGroups(
    request: DeleteGroupsRequest
    ): Promise<BaseResponse<DeleteGroupsResponse>> {
    return this.httpClient.delete(`${this.basePath}/groups`, {
      data: request
    });
  }
}
