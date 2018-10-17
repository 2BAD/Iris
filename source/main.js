import odata from './odata.js'
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
    const data = await bitrix.fetch(event.pathParameters.resource)
    const result = JSON.parse(data.Body.toString())
    return response.success(odata.wrap(result))
  } catch (e) {
    return response.failure(e.statusCode, e)
  }
}
