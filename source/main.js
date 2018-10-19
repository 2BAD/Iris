import odata from './odata.js'
import metadata from './metadata.js'
import bitrix from './crm/bitrix.js'
import response from './utils/response.js'

export const sync = async (event, context) => {
  const REST_URI = event.queryStringParameters.REST_URI
  const TOKEN = event.queryStringParameters.TOKEN

  try {
    await bitrix.dump(REST_URI, TOKEN)
    return response.success('Ok')
  } catch (e) {
    return response.failure(e.statusCode, e)
  }
}

export const fetch = async (event, context) => {
  try {
    const resource = event.pathParameters.resource
    const data = await bitrix.fetch(resource)
    const result = JSON.parse(data.Body.toString())
    return response.success(odata.wrap(result, event))
  } catch (e) {
    return response.failure(e.statusCode, e)
  }
}

export const list = async (event, context) => {
  const headers = {
    'OData-Version': '4.0'
  }
  return response.success(odata.wrap(bitrix.entities(), event), 'json', headers)
}

export const metadata = async (event, context) => {
  const headers = {
    'Content-Type': 'application/xml',
    'OData-Version': '4.0'
  }

  return response.success(metadata, 'xml', headers)
}
