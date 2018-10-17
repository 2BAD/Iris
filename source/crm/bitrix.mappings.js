const resources = [
  {
    name: 'Deals',
    method: 'crm.deal.list',
    filename: 'data/deals.json'
  },
  {
    name: 'Leads',
    method: 'crm.lead.list',
    filename: 'data/leads.json'
  },
  {
    name: 'Companies',
    method: 'crm.company.list',
    filename: 'data/companies.json'
  },
  {
    name: 'Contacts',
    method: 'crm.contact.list',
    filename: 'data/contacts.json'
  },
  {
    name: 'Products',
    method: 'crm.product.list',
    filename: 'data/products.json'
  },
  {
    name: 'Statuses',
    method: 'crm.status.list',
    filename: 'data/statuses.json'
  },
  {
    name: 'Users',
    method: 'user.get',
    filename: 'data/users.json'
  }
]

export default resources
