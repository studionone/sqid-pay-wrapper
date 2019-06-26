import md5 from 'md5'
import axios from 'axios'

export class SQID {
  constructor (apiKey, merchantCode, environmentBaseURI, passPhrase = null) {
    this.apiKey = apiKey
    this.merchantCode = merchantCode
    this.environmentBaseURI = environmentBaseURI
    this.passPhrase = passPhrase
  }

  /**
   * Generate the hash string required by Sqid requests
   * @param  {string} primaryKey - The value to be hashed
   * @return {string}            - The final hash string
   */
  _generateHash = primaryKey => md5(`${this.passPhrase}${primaryKey}${this.apiKey}`)

  /**
   * Send a request to the Sqid API
   * @param  {object} payload      - A payload object to be sent with the request
   * @param  {string} method       - Method for sending the request
   * @param  {string} endpoint     - The relative path of the API endpoint
   * @param  {string} methodName   - The name of the SQID method
   * @param  {string} primaryKey   - The request primary key
   * @return {promise}             - A promise that resolves to the API response data
   */
  _sqidRequest = (payload, method, endpoint, methodName, primaryKey = null) => {
    const { merchantCode, apiKey, environmentBaseURI } = this
    const hash = this.passPhrase
      ? this._generateHash(primaryKey)
      : null

    // Only add the payload to the request body for POST requests
    const data = {
      ...payload,
      apiKey,
      hash,
      hashValue: hash,
      merchantCode,
      methodName,
    }

    const options = {
      baseURL: environmentBaseURI,
      url: `/${endpoint}`,
      method,
    }

    // If it is a GET request, add the payload as query parameters, otherwise add to the body
    if (method === 'GET') {
      options.params = data
    } else {
      options.data = data
    }

    return axios(options)
      .then(res => res)
      .catch(err => err)
  }

  /**
   * Send a request to the Sqid API getToken endpoint to generate a reusable token for a customer
   * @param  {object} data - A payload object to be sent with the request
   * @return {promise}     - A promise that resolves to the API response data
   */
  getToken = data => this._sqidRequest(data, 'POST', 'post', 'getToken')

  /**
   * Send a request to the Sqid API tokenInfo endpoint to retrieve information about the specified
   * token
   * @param  {string} token - The SQID token to get info for
   * @return {promise}      - A promise that resolves to the API response data
   */
  tokenInfo = token => this._sqidRequest({ token }, 'POST', 'post', 'tokenInfo', token)

  /**
   * Send a request to the Sqid API processTokenPayment endpoint in process a payment using a token
   * @param  {object} data - A payload object to be sent with the request
   * @return {promise}     - A promise that resolves to the API response data
   */
  processTokenPayment = (data) => {
    const primaryKey = data.amount.toFixed(2)
    return this._sqidRequest(data, 'POST', 'post', 'processTokenPayment', primaryKey)
  }

  /**
   * Send a request to the Sqid API getPaymentPage endpoint to get an existing payment page
   * @param  {string} payPageId - The ID of the payment page to retrieve
   * @return {promise}          - A promise that resolves to the API response data
   */
  getPaymentPage = (payPageId) => {
    const primaryKey = payPageId.toUpperCase()
    return this._sqidRequest({ payPageId }, 'GET', 'paypage/get', null, primaryKey)
  }

  /**
   * Send a request to the Sqid API payPaymentPage endpoint to process a payment using an existing
   * payment page
   * @param  {object} data  - A payload object to be sent with the request
   * @return {promise}      - A promise that resolves to the API response data
   */
  payPaymentPage = (data) => {
    const primaryKey = data.payPageId.toUpperCase()
    return this._sqidRequest(data, 'POST', 'paypage/get', null, primaryKey)
  }
}
