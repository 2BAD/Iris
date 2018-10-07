import got from 'got'
import flat from 'lodash/flattenDepth'
import { version } from './../../package.json'

const TOKEN = ''
const REST_URI = 'https://portal.bitrix24.ru/rest/'
const MAX_ENTRIES_PER_PAGE = 50
const MAX_PAGES_PER_BATCH = 50
const MAX_ENTRIES_PER_BATCH = MAX_ENTRIES_PER_PAGE * MAX_PAGES_PER_BATCH

const client = got.extend({
  baseUrl: REST_URI,
  json: true,
  headers: {
    'user-agent': `iris/${version}`
  },
  hooks: {
    beforeRequest: [
      options => {
        options.path += (options.path.indexOf('?') === -1) ? `?access_token=${TOKEN}` : `&access_token=${TOKEN}`
        console.log(options)
      }
    ]
  }
})

export const getData = async (resource, query) => client.get(resource, { query }).then(response => response.body)

export const getTotal = async (resource) => getData(resource).then(data => data.total)

export const getDataByPage = async (resource, total) => {
  let query = {}
  const requests = []

  // generate array of requests
  for (let i = 0; i <= total; i += MAX_ENTRIES_PER_PAGE) {
    query = { start: i }
    requests.push(getData(resource, query).then(data => data.result))
  }

  // wait for all requests to finish and return flatten to single level array data array
  return Promise.all(requests).then(data => flat(data, 1))
}

export const getDataByBatch = async (resource, total) => {
  const requests = []

  // generate a batch request for each 2500 entries
  for (let processed = 0; processed <= total; processed += MAX_ENTRIES_PER_BATCH) {
    let remaining = total - processed
    let pages = remaining > MAX_ENTRIES_PER_BATCH ? MAX_PAGES_PER_BATCH : Math.ceil(remaining / MAX_ENTRIES_PER_PAGE)

    let query = {}
    // generate query parameters object for each request
    for (let i = 0; i < pages; i++) {
      query[`cmd[${i}]`] = `${resource}?start=${processed + i * MAX_ENTRIES_PER_PAGE}`
    }

    requests.push(getData('batch', query).then(data => data.result.result))
  }

  // wait for all requests to finish and return flatten to single level data array
  return Promise.all(requests).then(data => flat(data, 2))
}

export const fetch = async (resource) => {
  const total = await getTotal(resource)

  return (total <= MAX_ENTRIES_PER_PAGE) ? getDataByPage(resource, total) : getDataByBatch(resource, total)
}
