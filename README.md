# Notifyre NodeJS SDK

A Node.js package for Notifyre Public API.

## Requirements/Dependencies

- [axios](https://www.npmjs.com/package/axios)

## Installation

```
npm install notifyre-nodejs-sdk
```

## User guide

The Notifyre API uses API tokens to authenticate requests.

If you don't have a Notifyre account already, you’ll need to create one [here](https://app.notifyre.com/sign-up) in order to use the API.

For more info, visit [API docs website](https://docs.notifyre.com).

### Notfyre API

#### Sample Usage

```js
const { NotifyreAPI } = require('notifyre-nodejs-sdk');
const notifyreAPI = new NotifyreAPI('apiKey');
const faxService = notifyreAPI.getFaxService();

/// Retrieve list of fax numbers
faxService
  .listFaxNumbers()
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

// The request above could also be done using async/await
async function listFaxNumbers() {
  try {
    const response = await faxService.listFaxNumbers();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
```

#### Instance Methods

| Name               | Description                       |
| ------------------ | --------------------------------- |
| getFaxService      | Returns fax service instance      |
| getSmsService      | Returns SMS service instance      |
| getContactsService | Returns Contacts service instance |

### Fax Service

#### Instance Methods

| Name                | Description                           |
| ------------------- | ------------------------------------- |
| listSentFaxes       | Returns sent faxes                    |
| submitFax           | Send fax                              |
| downloadSentFax     | Returns sent fax as base64 string     |
| listCoverPages      | Returns cover pages                   |
| listReceivedFaxes   | Returns received faxes                |
| downloadReceivedFax | Returns received fax as base64 string |
| listFaxNumbers      | Returns fax numbers                   |

### SMS Service

#### Instance Methods

| Name           | Description                        |
| -------------- | ---------------------------------- |
| listSentSms    | Returns sent SMS                   |
| submitSms      | Send SMS                           |
| getSms         | Returns sent SMS details           |
| listSmsReplies | Returns cover pages                |
| getSmsReply    | Returns received SMS details       |
| listSmsNumbers | Returns SMS numbers and sender IDs |

### Contacts Service

#### Instance Methods

| Name                    | Description                                          |
| ----------------------- | ---------------------------------------------------- |
| listContacts            | Returns address book contacts                        |
| createContact           | Create address book contact                          |
| updateContact           | Update address book contact                          |
| deleteContacts          | Delete address book contacts                         |
| getContact              | Returns address book contact details                 |
| addContactsToGroups     | Adds address book contacts to address book groups    |
| removeContactsFromGroup | Remove address book contacts from address book group |
| listGroups              | Returns address book groups                          |
| createGroup             | Create address book group                            |
| updateGroup             | Update address book group                            |
| deleteGroups            | Delete address book groups                           |

### Utilities

#### Methods

| Name            | Description                |
| --------------- | -------------------------- |
| verifySignature | Verifies Webhook signature |

## Build process

```bash
npm run build
```

_This will also update the package version and create tag._

## Testing

```bash
npm run test
```

### For TDD

```bash
npm run test:watch
```

## Deployment process

1. Create NPM account [here](https://www.npmjs.com/signup).
2. Run `npm login` (use npm account credentials).
3. Run `npm publish`.
