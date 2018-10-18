import storage from '../storage.js'
import Bitrix from '@2bad/iris.crm.bitrix'
import resources from './bitrix.mappings.js'

// dump all data from crm rest api to storage as json files
const dump = (REST_URI, TOKEN) => {
  const api = new Bitrix(REST_URI, TOKEN)

  return Promise.all(resources.map(resource =>
    api.fetch(resource.method)
      .then(data => storage.write(resource.filename, data))
  ))
}

// read data from storage
const fetch = (name) => {
  const resource = resources.find(resource => resource.name === name)
  return storage.read(resource.filename)
}

// generate list of entities for root listing
const entities = () => resources
  .map(resource => ({
    name: resource.name,
    kind: 'EntitySet',
    url: resource.name
  }))

const bitrix = {
  dump,
  fetch,
  entities
}

export default bitrix
