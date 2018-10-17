const wrap = (data) => {
  const response = {
    '@odata.context': '',
    value: data
  }
  return response
}

const odata = {
  wrap
}

export default odata
