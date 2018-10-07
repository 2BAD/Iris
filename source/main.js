import Bitrix from './utils/bitrix.js'
import saveToFile from './utils/fs/saveToFile.js'

const REST_URI = process.env.REST_URI
const TOKEN = process.env.TOKEN

const bx = new Bitrix(REST_URI, TOKEN)

bx.fetch('crm.deal.list')
  .then(data => saveToFile('deals.json', data))
  .catch(error => console.log(error))
