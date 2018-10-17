import storage from '../storage.js'
import Bitrix from '@2bad/iris.crm.bitrix'
import resources from './bitrix.mappings.js'

// dump all data from crm rest api to storage as json files
const dump = async (REST_URI, TOKEN) => {
  const bitrix = new Bitrix(REST_URI, TOKEN)

  return Promise.all(resources.map(async resource => {
    const result = await bitrix.fetch(resource.method)
    await storage.write(resource.filename, result)
  }))
}

// read data from storage
const fetch = async (name) => {
  const resource = resources.filter(resource => resource.name === name)[0]
  return storage.read(resource.filename)
}

// generate list of entities for root listing
const entities = () => {
  return resources.map(resource => {
    return {
      name: resource.name,
      kind: 'EntitySet',
      url: resource.name
    }
  })
}

const bitrix = {
  dump,
  fetch,
  entities
}

export default bitrix
