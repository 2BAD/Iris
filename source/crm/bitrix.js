import s3 from '../s3.js'
import Bitrix from '@2bad/iris.crm.bitrix'
import resources from './bitrix.mappings.js'

const dump = async (REST_URI, TOKEN) => {
  const bitrix = new Bitrix(REST_URI, TOKEN)

  return Promise.all(resources.map(async resource => {
    console.time(`awaiting ${resource.method}`)
    const result = await bitrix.fetch(resource.method)
    console.timeEnd(`awaiting ${resource.method}`)

    console.time(`saving ${resource.filename} (${result.length} entries)`)
    await s3.save(result, resource.filename)
    console.timeEnd(`saving ${resource.filename} (${result.length} entries)`)
  }))
}

const fetch = async (name) => {
  const resource = resources.filter(resource => resource.name === name)[0]
  return s3.read(resource.filename)
}

const bitrix = {
  dump,
  fetch
}

export default bitrix
