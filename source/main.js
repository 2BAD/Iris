import Bitrix from '@2bad/iris.crm.bitrix'
import saveToFile from './utils/fs/saveToFile.js'

const REST_URI = process.env.REST_URI
const TOKEN = process.env.TOKEN

const bitrix = new Bitrix(REST_URI, TOKEN)

const resources = [
  {
    method: 'crm.deal.list',
    filename: './data/deals.json'
  },
  {
    method: 'crm.lead.list',
    filename: './data/leads.json'
  },
  {
    method: 'crm.company.list',
    filename: './data/companies.json'
  },
  {
    method: 'crm.contact.list',
    filename: './data/contacts.json'
  },
  {
    method: 'crm.product.list',
    filename: './data/products.json'
  },
  {
    method: 'crm.status.list',
    filename: './data/statuses.json'
  },
  {
    method: 'user.get',
    filename: './data/users.json'
  }
]

resources.forEach(resource => {
  bitrix.fetch(resource.method)
    .then(data => saveToFile(resource.filename, data))
    .catch(error => console.log(error))
})
