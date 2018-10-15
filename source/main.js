import Bitrix from '@2bad/iris.crm.bitrix'
import { save } from './s3.js'
import { success, failure } from './utils/response.js'

export const main = async (event, context) => {
  const REST_URI = event.queryStringParameters.REST_URI
  const TOKEN = event.queryStringParameters.TOKEN

  try {
    const bitrix = new Bitrix(REST_URI, TOKEN)
    const result = await bitrix.fetch('user.get')

    await save(result, 'user.json')

    return success('file saved')
  } catch (e) {
    return failure(e.statusCode, e)
  }
}
