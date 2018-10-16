const resources = [
  {
    name: 'deals',
    method: 'crm.deal.list',
    filename: 'data/deals.json'
  },
  {
    name: 'leads',
    method: 'crm.lead.list',
    filename: 'data/leads.json'
  },
  {
    name: 'companies',
    method: 'crm.company.list',
    filename: 'data/companies.json'
  },
  {
    name: 'contacts',
    method: 'crm.contact.list',
    filename: 'data/contacts.json'
  },
  {
    name: 'products',
    method: 'crm.product.list',
    filename: 'data/products.json'
  },
  {
    name: 'statuses',
    method: 'crm.status.list',
    filename: 'data/statuses.json'
  },
  {
    name: 'users',
    method: 'user.get',
    filename: 'data/users.json'
  }
]

export default resources
