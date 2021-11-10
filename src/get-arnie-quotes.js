const { httpGet } = require('./mock-http-interface');

/**
 * @typedef {{body: string, status: number}} apiResponse
 */
const SUCCESS_STATUS_CODE = 200;
const ARNIE_QUOTE_KEY = 'Arnie Quote';
const FAILURE_KEY = 'FAILURE';

/**
 * @param apiResponse {apiResponse} response from httpGet
 * @return {Object.<string, string>} arnie quote or failure message
 */
const transformApiResponseToQuote = (apiResponse) => {
  const body = JSON.parse(apiResponse.body);
  const message = body.message;
  return apiResponse.status === SUCCESS_STATUS_CODE
      ? { [ARNIE_QUOTE_KEY]: message }
      : { [FAILURE_KEY]: message }
}

/**
 * @param urls {string[]} all urls to call
 * @return {apiResponse[]} result from each api call
 */
const bulkCallHttpGet = async (urls) => await Promise.all(urls.map((url) => httpGet(url)));

/**
 * @param urls {string[]} all urls to call for arnie quotes
 * @return {Object.<string, string>[]} array of quotes or failure messages
 */
const getArnieQuotes = async (urls) => {
  const quotes = [];
  const apiResults = await bulkCallHttpGet(urls);
  for (const result of apiResults) {
    const quote = transformApiResponseToQuote(result);
    quotes.push(quote);
  }
  return quotes;
};

module.exports = {
  getArnieQuotes,
};
