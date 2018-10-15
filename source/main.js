import AWS from 'aws-sdk'
import Bitrix from '@2bad/iris.crm.bitrix'
import { success, failure } from './utils/response.js'

export const main = async (event, context) => {
  const REST_URI = event.queryStringParameters.REST_URI
  const TOKEN = event.queryStringParameters.TOKEN

  const bitrix = new Bitrix(REST_URI, TOKEN)
  const S3 = new AWS.S3()

  try {
    const result = await bitrix.fetch('user.get')

    const options = {
      Bucket: process.env.DATA_BUCKET,
      Key: 'users.json',
      Body: JSON.stringify(result)
    }

    await S3.putObject(options).promise()
    return success('file saved')
  } catch (e) {
    return failure(e.statusCode, e)
  }
}
