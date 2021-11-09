const { httpGet } = require('./mock-http-interface');

const SUCCESS_STATUS_CODE = 200;
const ARNIE_QUOTE_KEY = 'Arnie Quote';
const FAILURE_KEY = 'FAILURE';
const transformApiResponseToQuote = (apiResponse) => {
  const body = JSON.parse(apiResponse.body);
  const message = body.message;
  if (apiResponse.status === SUCCESS_STATUS_CODE) {
    return { [ARNIE_QUOTE_KEY]: message };
  } else {
    return { [FAILURE_KEY]: message };
  }
}

const batchCallUrls = async (urls) => await Promise.all(urls.map((url) => httpGet(url)));

const getArnieQuotes = async (urls) => {
  const quotes = [];
  const apiResults = await batchCallUrls(urls);
  for (const result of apiResults) {
    const quote = transformApiResponseToQuote(result);
    quotes.push(quote);
  }
  return quotes;
};

module.exports = {
  getArnieQuotes,
};
