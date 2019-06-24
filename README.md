# SQID Payments API wrapper

This project contains helper functions for accessing the [SQID payments API](https://sqidpay.atlassian.net/wiki/spaces/SRP/overview)

## Deploying

The compiled files are included in this repo. Please ensure that you run `npm run build` before making a pull request so that latest files are included.

## Usage

### Import

```javascript
import { SQID } from 'sqid-pay-wrapper'
```

### Initialise

This package has been implemented using a helper class which must be initialised before it can be used

```javascript
const sqid = new SQID(apiKey, merchantCode, environmentBaseURI, passPhrase)
```

The required parameters to initialise the class are

| Parameter Name        | Description                                                                                               |
|-----------------------|-----------------------------------------------------------------------------------------------------------|
| apiKey                | SQID API key                                                                                              |
| merchantCode          | SQID merchant code                                                                                        |
| environmentBaseURI    | SQID base url e.g `https://api.staging.sqidpay.com`                                                       |
| passPhrase (Optional) | SQID secret pass phrase used for generating the hash. This is not required for all methods i.e `getToken` |

### Available functions

To use any of the available functions call the function on the initialised class, sending only the dynamic data for the customer/merchant. Below is an example of the getToken function:

```javascript
const params = {
    cardNumber,
    cardExpiry,
    cardName,
    customerEmail,
    customerName,
    customerHouseStreet,
    customerSuburb,
    customerCity,
    customerState,
    customerCountry,
    customerPostCode,
}

this.SQID.getToken(params)
      .then(({ data }) => { ... })
      .catch((error) => { ... })
```

| Function                                                                         | Description                     |
|--------------------------------------------------------------------------------- |---------------------------------|
| [getToken](https://sqidpay.atlassian.net/wiki/spaces/SRP/pages/1605679/getToken) | Generate a token for a customer |
