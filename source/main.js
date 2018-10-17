import odata from './odata.js'
import bitrix from './crm/bitrix.js'
import response from './utils/response.js'

export const sync = async (event, context) => {
  const REST_URI = event.queryStringParameters.REST_URI
  const TOKEN = event.queryStringParameters.TOKEN

  try {
    await bitrix.dump(REST_URI, TOKEN)
    return response.success('Ok')
  } catch (e) {
    return response.failure(e.statusCode, e)
  }
}

export const fetch = async (event, context) => {
  try {
    const data = await bitrix.fetch(event.pathParameters.resource)
    const result = JSON.parse(data.Body.toString())
    return response.success(odata.wrap(result))
  } catch (e) {
    return response.failure(e.statusCode, e)
  }
}

export const list = async (event, context) => {
  const headers = {
    'OData-Version': '4.0'
  }
  return response.success(odata.wrap(bitrix.entities()), 'json', headers)
}

export const metadata = async (event, context) => {
  const headers = {
    'Content-Type': 'application/xml',
    'OData-Version': '4.0'
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<edmx:Edmx
  xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx" Version="4.0">
  <edmx:DataServices>
    <Schema
      xmlns="http://docs.oasis-open.org/odata/ns/edm" Namespace="Iris">
      <EntityType Name="Deal" OpenType="true">
        <Key>
          <PropertyRef Name="ID"/>
        </Key>
        <Property Name="ID" Type="Edm.Int32" Nullable="false"/>
        <Property Name="TITLE" Type="Edm.String"/>
        <Property Name="OPPORTUNITY" Type="Edm.String"/>
        <Property Name="DATE_CREATE" Type="Edm.DateTimeOffset"/>
      </EntityType>
      <EntityType Name="Lead" OpenType="true">
        <Key>
          <PropertyRef Name="ID"/>
        </Key>
        <Property Name="ID" Type="Edm.Int32" Nullable="false"/>
      </EntityType>
      <EntityContainer Name="Default">
        <EntitySet Name="Deals" EntityType="Iris.Deal"/>
        <EntitySet Name="Leads" EntityType="Iris.Lead"/>
      </EntityContainer>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`

  return response.success(xml, 'xml', headers)
}
