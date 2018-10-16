import AWS from 'aws-sdk'

const save = (data, filename) => {
  const S3 = new AWS.S3()

  const options = {
    Bucket: process.env.DATA_BUCKET,
    Key: filename,
    Body: JSON.stringify(data)
  }

  return S3.putObject(options).promise()
}

const s3 = {
  save
}

export default s3
