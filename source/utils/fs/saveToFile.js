import { promises as fs } from 'fs'
import isJSON from './../type/isJSON.js'

export default function (filename, data, pretty = true) {
  data = isJSON(data) ? data : JSON.stringify(data, null, (pretty) ? 2 : null)
  return fs.writeFile(filename, data)
}
