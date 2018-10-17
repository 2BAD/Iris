// define cross-origin resource sharing headers
const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true
}

// return response body and 200 http code
function success (body, type = 'json', headers = {}) {
  return wrap(200, body, type, headers)
}

// return error message and error http code
function failure (code = 500, body, type = 'json', headers = {}) {
  console.error(body)
  return wrap(code, body, type, headers)
}

// common response wrapper for api gateway
function wrap (code, body, type, headers) {
  return {
    statusCode: code,
    headers: { ...cors, ...headers },
    body: (type === 'json') ? JSON.stringify(body) : body
  }
}

const response = {
  success,
  failure
}

export default response
