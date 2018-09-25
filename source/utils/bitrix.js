import got from 'got'
import fromEntries from './type/fromEntries.js'
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

export const getTotal = async (resource) => client.get(resource).then(response => response.body.total)

export const getDataByPage = async (resource, total) => {
  const requests = []

  // generate array of requests
  for (let i = 0; i <= total; i += 50) {
    requests.push(client.get(resource, { query: { start: i } }).then(response => response.body.result))
  }

  // wait for all requests to finish and return flatten data to single level array
  return Promise.all(requests).then(data => [].concat(...data))
}
}

export const getData = async (resource) => {
  const total = await getTotal(resource)

  return (total <= 50) ? getDataByPage(resource, total) : getDataByBatch(resource, total)
}
