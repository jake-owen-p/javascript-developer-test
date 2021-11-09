const { httpGet } = require('./mock-http-interface');

const SUCCESS_STATUS_CODE = 200;
const ARNIE_QUOTE_KEY = 'Arnie Quote';
const FAILURE_KEY = 'FAILURE';
const transformApiResultToQuote = (apiResponse) => {
  const resultBody = JSON.parse(apiResponse.body);
  const message = resultBody.message;
  if (apiResponse.status === SUCCESS_STATUS_CODE) {
    return { [ARNIE_QUOTE_KEY]: message };
  } else {
    return { [FAILURE_KEY]: message };
  }
}

const batchCallApi = async (urls) => await Promise.all(urls.map((url) => httpGet(url)));

const getArnieQuotes = async (urls) => {
  const results = [];
  const apiResults = await batchCallApi(urls);
  for (const result of apiResults) {
    const quote = transformApiResultToQuote(result);
    results.push(quote);
  }
  return results;
};

module.exports = {
  getArnieQuotes,
};
