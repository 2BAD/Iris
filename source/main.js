import { getData } from './utils/bitrix.js'
import saveToFile from './utils/fs/saveToFile.js'

getData('crm.deal.list').then(data => saveToFile('deals.json', data))
