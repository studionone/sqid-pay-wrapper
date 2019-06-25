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
   * @param  {string} endpoint     - The relative path of the API endpoint
   * @param  {string} methodName   - The name of the SQID method
   * @param  {string} primaryKey   - The request primary key
   * @return {promise}             - A promise that resolves to the API response data
   */
  _sqidRequest = (payload, endpoint, methodName, primaryKey = null) => {
    const { merchantCode, apiKey, environmentBaseURI } = this
    const hash = this.passPhrase
      ? this._generateHash(primaryKey)
      : null

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
      method: 'post',
      data,
    }

    return axios(options)
      .then(res => res)
      .catch(err => err)
  }

  /**
   * Send a request to the Sqid API getToken endpoint
   * @param  {object} data - A payload object to be sent with the request
   * @return {promise}     - A promise that resolves to the API response data
   */
  getToken = data => this._sqidRequest(data, 'post', 'getToken')

  /**
   * Send a request to the Sqid API tokenInfo endpoint
   * @param  {string} token - The SQID token to get info for
   * @return {promise}      - A promise that resolves to the API response data
   */
  tokenInfo = token => this._sqidRequest(token, 'post', 'tokenInfo', token)

  /**
   * Send a request to the Sqid API processTokenPayment endpoint
   * @param  {string} data - A payload object to be sent with the request
   * @return {promise}      - A promise that resolves to the API response data
   */
  processTokenPayment = data => this._sqidRequest(data, 'post', 'processTokenPayment', data.amount)
}
