import bitrix from './crm/bitrix.js'
import { success, failure } from './utils/response.js'

export const sync = async (event, context) => {
  const REST_URI = event.queryStringParameters.REST_URI
  const TOKEN = event.queryStringParameters.TOKEN

  try {
    await bitrix.dump(REST_URI, TOKEN)
    return success('Ok')
  } catch (e) {
    return failure(e.statusCode, e)
  }
}

export const fetch = async (event, context) => {
  try {
    const data = await bitrix.fetch(event.pathParameters.resource)
    return success(JSON.parse(data.Body.toString()))
  } catch (e) {
    return failure(e.statusCode, e)
  }
}
