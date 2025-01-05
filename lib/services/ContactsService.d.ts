import { AxiosInstance } from 'axios';
import { AddContactsToGroupsRequest, AddContactsToGroupsResponse, CreateContactRequest, CreateContactResponse, CreateGroupResponse, deleteContactsResponse, DeleteGroupsRequest, DeleteGroupsResponse, GetContactResponse, ListContactsRequest, ListContactsResponse, ListGroupsRequest, ListGroupsResponse, RemoveContactsFromGroupRequest, RemoveContactsFromGroupResponse, UpdateContactRequest, UpdateContactResponse, UpdateGroupRequest, UpdateGroupResponse } from '..';
import { BaseResponse } from '../models';
export declare class ContactsService {
    private httpClient;
    private basePath;
    constructor(httpClient: AxiosInstance);
    listContacts(request: ListContactsRequest): Promise<BaseResponse<ListContactsResponse>>;
    createContact(request: CreateContactRequest): Promise<BaseResponse<CreateContactResponse>>;
    updateContact(request: UpdateContactRequest): Promise<BaseResponse<UpdateContactResponse>>;
    deleteContacts(contacts: string[]): Promise<BaseResponse<deleteContactsResponse>>;
    getContact(id: string): Promise<BaseResponse<GetContactResponse>>;
    addContactsToGroups(request: AddContactsToGroupsRequest): Promise<BaseResponse<AddContactsToGroupsResponse>>;
    removeContactsFromGroup(request: RemoveContactsFromGroupRequest): Promise<BaseResponse<RemoveContactsFromGroupResponse>>;
    listGroups(request: ListGroupsRequest): Promise<BaseResponse<ListGroupsResponse>>;
    createGroup(name: string): Promise<BaseResponse<CreateGroupResponse>>;
    updateGroup(request: UpdateGroupRequest): Promise<BaseResponse<UpdateGroupResponse>>;
    deleteGroups(request: DeleteGroupsRequest): Promise<BaseResponse<DeleteGroupsResponse>>;
}
