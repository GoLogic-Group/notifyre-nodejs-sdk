import { AxiosInstance } from 'axios';
import {
  AddContactsToGroupsRequest,
  AddContactsToGroupsResponse,
  CreateContactRequest,
  CreateContactResponse,
  CreateGroupResponse,
  deleteContactsResponse,
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
import { BaseResponse, NotifyreError } from '../models';

export class ContactsService {
  private basePath = '/addressbook';

  constructor(private httpClient: AxiosInstance) {}

  async listContacts(
    request: ListContactsRequest
  ): Promise<BaseResponse<ListContactsResponse>> {
    try {
      return (
        await this.httpClient.post(`${this.basePath}/contacts/search`, request)
      ).data;
    } catch (err: any) {
      return new NotifyreError(err.message);
    }
  }

  async createContact(
    request: CreateContactRequest
  ): Promise<BaseResponse<CreateContactResponse>> {
    try {
      return (await this.httpClient.post(`${this.basePath}/contacts`, request))
        .data;
    } catch (err: any) {
      return new NotifyreError(err.message);
    }
  }

  async updateContact(
    request: UpdateContactRequest
  ): Promise<BaseResponse<UpdateContactResponse>> {
    try {
      return (
        await this.httpClient.put(
          `${this.basePath}/contacts/${request.id}`,
          request
        )
      ).data;
    } catch (err: any) {
      return new NotifyreError(err.message);
    }
  }

  async deleteContacts(
    contacts: string[]
  ): Promise<BaseResponse<deleteContactsResponse>> {
    try {
      return (
        await this.httpClient.delete(`${this.basePath}/contacts`, {
          data: { contacts }
        })
      ).data;
    } catch (err: any) {
      return new NotifyreError(err.message);
    }
  }

  async getContact(id: string): Promise<BaseResponse<GetContactResponse>> {
    try {
      return (await this.httpClient.get(`${this.basePath}/contacts/${id}`))
        .data;
    } catch (err: any) {
      return new NotifyreError(err.message);
    }
  }

  async addContactsToGroups(
    request: AddContactsToGroupsRequest
  ): Promise<BaseResponse<AddContactsToGroupsResponse>> {
    try {
      return (
        await this.httpClient.post(`${this.basePath}/groups/contacts`, request)
      ).data;
    } catch (err: any) {
      return new NotifyreError(err.message);
    }
  }

  async removeContactsFromGroup(
    request: RemoveContactsFromGroupRequest
  ): Promise<BaseResponse<RemoveContactsFromGroupResponse>> {
    try {
      return (
        await this.httpClient.delete(`${this.basePath}/groups/contacts`, {
          data: request
        })
      ).data;
    } catch (err: any) {
      return new NotifyreError(err.message);
    }
  }

  async listGroups(
    request: ListGroupsRequest
  ): Promise<BaseResponse<ListGroupsResponse>> {
    try {
      return (
        await this.httpClient.get(`${this.basePath}/groups`, {
          params: request
        })
      ).data;
    } catch (err: any) {
      return new NotifyreError(err.message);
    }
  }

  async createGroup(name: string): Promise<BaseResponse<CreateGroupResponse>> {
    try {
      return (
        await this.httpClient.post(`${this.basePath}/groups`, {
          name
        })
      ).data;
    } catch (err: any) {
      return new NotifyreError(err.message);
    }
  }

  async updateGroup(
    request: UpdateGroupRequest
  ): Promise<BaseResponse<UpdateGroupResponse>> {
    try {
      return (
        await this.httpClient.put(`${this.basePath}/groups/${request.id}`, {
          name: request.name
        })
      ).data;
    } catch (err: any) {
      return new NotifyreError(err.message);
    }
  }

  async deleteGroups(
    groups: string[]
  ): Promise<BaseResponse<DeleteGroupsResponse>> {
    try {
      return (
        await this.httpClient.delete(`${this.basePath}/groups`, {
          data: {
            groups
          }
        })
      ).data;
    } catch (err: any) {
      return new NotifyreError(err.message);
    }
  }
}
