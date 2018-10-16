import bitrix from './crm/bitrix.js'
import { success, failure } from './utils/response.js'

export const main = async (event, context) => {
  const REST_URI = event.queryStringParameters.REST_URI
  const TOKEN = event.queryStringParameters.TOKEN

  try {
    await bitrix.dump(REST_URI, TOKEN)
    return success('Ok')
  } catch (e) {
    return failure(e.statusCode, e)
  }
}
