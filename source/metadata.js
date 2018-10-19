export default const metadata = `<?xml version="1.0" encoding="UTF-8"?>
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
        <Property Name="OPPORTUNITY" Type="Edm.Decimal"/>
        <Property Name="DATE_CREATE" Type="Edm.DateTimeOffset"/>
      </EntityType>
      <EntityType Name="Lead" OpenType="true">
        <Key>
          <PropertyRef Name="ID"/>
        </Key>
        <Property Name="ID" Type="Edm.Int32" Nullable="false"/>
      </EntityType>
      <EntityType Name="Companies" OpenType="true">
        <Key>
          <PropertyRef Name="ID"/>
        </Key>
        <Property Name="ID" Type="Edm.Int32" Nullable="false"/>
      </EntityType>
      <EntityType Name="Contacts" OpenType="true">
        <Key>
          <PropertyRef Name="ID"/>
        </Key>
        <Property Name="ID" Type="Edm.Int32" Nullable="false"/>
      </EntityType>
      <EntityType Name="Products" OpenType="true">
        <Key>
          <PropertyRef Name="ID"/>
        </Key>
        <Property Name="ID" Type="Edm.Int32" Nullable="false"/>
      </EntityType>
      <EntityType Name="Statuses" OpenType="true">
        <Key>
          <PropertyRef Name="ID"/>
        </Key>
        <Property Name="ID" Type="Edm.Int32" Nullable="false"/>
      </EntityType>
      <EntityType Name="Users" OpenType="true">
        <Key>
          <PropertyRef Name="ID"/>
        </Key>
        <Property Name="ID" Type="Edm.Int32" Nullable="false"/>
      </EntityType>
      <EntityContainer Name="Default">
        <EntitySet Name="Deals" EntityType="Iris.Deal"/>
        <EntitySet Name="Leads" EntityType="Iris.Lead"/>
        <EntitySet Name="Companies" EntityType="Iris.Companies"/>
        <EntitySet Name="Contacts" EntityType="Iris.Contacts"/>
        <EntitySet Name="Products" EntityType="Iris.Products"/>
        <EntitySet Name="Statuses" EntityType="Iris.Statuses"/>
        <EntitySet Name="Users" EntityType="Iris.Users"/>
      </EntityContainer>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`
