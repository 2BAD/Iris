import Bitrix from './utils/bitrix.js'
import saveToFile from './utils/fs/saveToFile.js'

const REST_URI = process.env.REST_URI
const TOKEN = process.env.TOKEN

const bx = new Bitrix(REST_URI, TOKEN)

const resources = {
  'crm.deal.list': 'deals.json',
  'crm.lead.list': 'leads.json',
  'crm.company.list': 'companies.json',
  'crm.contact.list': 'contacts.json',
  'crm.product.list': 'products.json',
  'crm.status.list': 'statuses.json',
  'user.get': 'users.json'
}

Object.keys(resources).forEach(key => {
  bx.fetch(key)
    .then(data => saveToFile(resources[key], data))
    .catch(error => console.log(error))
})
