"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsService = void 0;
var ContactsService = (function () {
    function ContactsService(httpClient) {
        this.httpClient = httpClient;
        this.basePath = '/addressbook';
    }
    ContactsService.prototype.listContacts = function (request) {
        return this.httpClient.post("".concat(this.basePath, "/contacts/search"), request);
    };
    ContactsService.prototype.createContact = function (request) {
        return this.httpClient.post("".concat(this.basePath, "/contacts"), request);
    };
    ContactsService.prototype.updateContact = function (request) {
        return this.httpClient.put("".concat(this.basePath, "/contacts/").concat(request.id), request);
    };
    ContactsService.prototype.deleteContacts = function (contacts) {
        return this.httpClient.delete("".concat(this.basePath, "/contacts"), {
            data: { contacts: contacts }
        });
    };
    ContactsService.prototype.getContact = function (id) {
        return this.httpClient.get("".concat(this.basePath, "/contacts/").concat(id));
    };
    ContactsService.prototype.addContactsToGroups = function (request) {
        return this.httpClient.post("".concat(this.basePath, "/groups/contacts"), request);
    };
    ContactsService.prototype.removeContactsFromGroup = function (request) {
        return this.httpClient.delete("".concat(this.basePath, "/groups/contacts"), {
            data: request
        });
    };
    ContactsService.prototype.listGroups = function (request) {
        return this.httpClient.get("".concat(this.basePath, "/groups"), {
            params: request
        });
    };
    ContactsService.prototype.createGroup = function (name) {
        return this.httpClient.post("".concat(this.basePath, "/groups"), {
            name: name
        });
    };
    ContactsService.prototype.updateGroup = function (request) {
        return this.httpClient.put("".concat(this.basePath, "/groups/").concat(request.id), {
            name: request.name
        });
    };
    ContactsService.prototype.deleteGroups = function (request) {
        return this.httpClient.delete("".concat(this.basePath, "/groups"), {
            data: request
        });
    };
    return ContactsService;
}());
exports.ContactsService = ContactsService;
