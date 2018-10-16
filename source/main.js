import Bitrix from '@2bad/iris.crm.bitrix'
import { save } from './s3.js'
import { success, failure } from './utils/response.js'
import { resources } from './crm/bitrix.mappings.js'

export const main = async (event, context) => {
  const REST_URI = event.queryStringParameters.REST_URI
  const TOKEN = event.queryStringParameters.TOKEN

  try {
    const bitrix = new Bitrix(REST_URI, TOKEN)

    await Promise.all(resources.map(async resource => {
      console.time(`awaiting ${resource.method}`)
      const result = await bitrix.fetch(resource.method)
      console.timeEnd(`awaiting ${resource.method}`)
      console.time(`saving ${resource.filename} (${result.length} entries)`)
      await save(result, resource.filename)
      console.timeEnd(`saving ${resource.filename} (${result.length} entries)`)
    }))

    return success('file saved')
  } catch (e) {
    return failure(e.statusCode, e)
  }
}
