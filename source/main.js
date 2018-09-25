import { fetch } from './utils/bitrix.js'
import saveToFile from './utils/fs/saveToFile.js'

fetch('crm.deal.list')
  .then(data => saveToFile('deals.json', data))
  .catch(error => console.log(error))
