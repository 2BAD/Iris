import got from 'got'
import fromEntries from './type/fromEntries.js'
import flat from 'lodash/flattenDepth'
import { version } from './../../package.json'

const TOKEN = ''
const REST_URI = 'https://portal.bitrix24.ru/rest/'

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
  for (let i = 0; i <= total; i += 50) {
    query = { start: i }
    requests.push(getData(resource, query).then(data => data.result))
  }

  // wait for all requests to finish and return flatten data to single level array
  return Promise.all(requests).then(data => flat(data))
}

export const getDataByBatch = async (resource, total) => {
  const requests = []

  for (let i = 0; i <= total; i += 2500) {
    // let pages = i % 2500 || 2500

    let query = fromEntries(Array.from({ length: 50 }, (v, i) => {
      const cmd = `cmd[${i}]`
      const str = `${resource}?start=${(i + 1) * 50}`

      return [cmd, str]
    }))

    requests.push(getData('batch', query).then(data => data.result.result))
  }

  return Promise.all(requests).then(data => flat(data, 2))
}

export const fetch = async (resource) => {
  const total = await getTotal(resource)

  return (total <= 50) ? getDataByPage(resource, total) : getDataByBatch(resource, total)
}
