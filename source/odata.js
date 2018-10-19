const PAGE_SIZE = 500

const wrap = (data, { queryStringParameters, pathParameters }) => {
  const skip = (queryStringParameters && queryStringParameters.$skip) ? parseInt(queryStringParameters.$skip) : 0
  const { resource } = pathParameters || {}
  const link = 'https://botjva5j5i.execute-api.eu-central-1.amazonaws.com/development/iris/odata/'
  const metadataLink = `${link}$metadata`
  const context = (resource) ? `${metadataLink}#${resource}` : metadataLink
  const offset = PAGE_SIZE + skip

  const response = {
    '@odata.context': context,
    'value': data.slice(skip, offset)
  }

  if (resource && data.length > offset) {
    response['@odata.nextLink'] = `${link}${resource}?$skip=${offset}`
  }

  return response
}

const odata = {
  wrap
}

export default odata
