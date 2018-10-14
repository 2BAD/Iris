const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true
}

export function success (body) {
  return wrap(200, body)
}

export function failure (code = 500, body) {
  console.error(body)
  return wrap(code, body)
}

function wrap (code, body) {
  return {
    statusCode: code,
    headers: cors,
    body: JSON.stringify(body)
  }
}
