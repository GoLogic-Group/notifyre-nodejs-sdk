export interface ListContactsRequest {
  searchQuery: string;
  page: number;
  limit: number;
  type: string;
  sortBy: string;
  sortDir: string;
  groupIds: string[];
  includeUnsubscribed: boolean;
}

export interface ListContactsResponse {
  contacts: Contact[];
  total: number;
}

export interface Contact {
  createdDateUtc: number;
  customFields: ContactCustomField[];
  email: string;
  faxNumber: string;
  firstName: string;
  fullName: string;
  groups: Omit<Group, 'contactsCount'>[];
  id: string;
  lastName: string;
  mobileNumber: string;
  organization: string;
}

export interface ContactCustomField {
  id: string;
  key: string;
  value: string;
}

export interface CreateContactRequest {
  customFields: Omit<ContactCustomField, 'id'>[];
  email: string;
  faxNumber: string;
  firstName: string;
  groupName: string | null;
  groups: string[] | null;
  lastName: string;
  mobileNumber: string;
  organization: string;
}

export interface CreateContactResponse extends Contact {}

export interface UpdateContactRequest
  extends Omit<CreateContactRequest, 'groupName' | 'groups'> {
  id: string;
}

export interface UpdateContactResponse extends Contact {}

export interface deleteContactsResponse {
  deleted: boolean;
}

export interface GetContactResponse extends Contact {}

export interface AddContactsToGroupsRequest {
  contacts: string[];
  groups: string[];
}

export interface AddContactsToGroupsResponse {
  added: boolean;
}

export interface RemoveContactsFromGroupRequest {
  contacts: string[];
  groupID: string;
}

export interface RemoveContactsFromGroupResponse {
  removed: boolean;
}

export interface ListGroupsRequest {
  searchQuery: string;
  sortBy: string;
  sortDir: string;
}

export interface ListGroupsResponse {
  groups: Group[];
}

export interface Group {
  contactsCount: number;
  createdDateUtc: number;
  id: string;
  name: string;
}

export interface CreateGroupResponse extends Omit<Group, 'contactsCount'> {}

export interface UpdateGroupRequest {
  id: string;
  name: string;
}

export interface UpdateGroupResponse extends Omit<Group, 'contactsCount'> {}

export interface DeleteGroupsResponse {
  deleted: boolean;
}
