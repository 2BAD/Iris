import AWS from 'aws-sdk'
const S3 = new AWS.S3()

// write data to S3 object storage
const write = (filename, data) => {
  const options = {
    Bucket: process.env.DATA_BUCKET,
    Key: filename,
    Body: JSON.stringify(data)
  }

  return S3.putObject(options).promise()
}

// read data from S3 object storage
const read = (filename) => {
  const options = {
    Bucket: process.env.DATA_BUCKET,
    Key: filename
  }

  return S3.getObject(options).promise()
}

const storage = {
  write,
  read
}

export default storage
