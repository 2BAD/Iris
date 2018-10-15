import AWS from 'aws-sdk'

export const save = (data, filename) => {
  const S3 = new AWS.S3()

  const options = {
    Bucket: process.env.DATA_BUCKET,
    Key: filename,
    Body: JSON.stringify(data)
  }

  return S3.putObject(options).promise()
}
