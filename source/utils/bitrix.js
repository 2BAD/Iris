import got from 'got'
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

export const getTotal = async (resource) => {
  return client.get(resource).then(response => response.body.total)
}

export const getData = async (resource) => {
  const total = await getTotal(resource)
  const requests = []

  for (let i = 0; i <= total; i += 50) {
    requests.push(client.get(resource, { query: { start: i } }).then(response => response.body.result))
  }

  // flatten data to single level array
  return Promise.all(requests).then(data => [].concat(...data))
}
