import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryBuilder, formatQuery } from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.css';
import DataTable from './components/DataTable';
import mockData from './mockData';
import './App.css';

const fields = [
  { name: 'NumeroDocumento', label: 'Número Documento' },
  { name: 'Bodega', label: 'Bodega' },
  { name: 'Cant_Original', label: 'Cantidad Original' },
  { name: 'Cant_Remisionada', label: 'Cantidad Remisionada' },
  { name: 'Centro_Costos', label: 'Centro Costos' },
  { name: 'Cod_Ubicacion', label: 'Cod Ubicación' },
  { name: 'Detalle', label: 'Detalle' },
  { name: 'Fecha_Dcto', label: 'Fecha Documento' },
  { name: 'Cliente', label: 'Cliente' },
  { name: 'Tipo_Cartera', label: 'Tipo Cartera' },
  { name: 'Tipo_Mvto', label: 'Tipo Movimiento' },
  { name: 'Vendedor', label: 'Vendedor' },
  { name: 'Nota', label: 'Nota' },
  { name: 'Enviadoa', label: 'Enviado a' },
  { name: 'CodCiudadEnvio', label: 'Cod Ciudad Envío' },
  { name: 'OrdenCompra', label: 'Orden Compra' },
  { name: 'CREO_FACT', label: 'Creó Factura' },
  { name: 'Impuestos', label: 'Impuestos' },
  { name: 'nit', label: 'NIT' },
  { name: 'Producto', label: 'Producto' },
  { name: 'CodRete', label: 'Cod Rete' },
  { name: 'CodRetica', label: 'Cod Retica' },
  { name: 'Total_Bruto', label: 'Total Bruto' },
  { name: 'Total_Prod', label: 'Total Producto' },
  { name: 'Total_IVA', label: 'Total IVA' },
  { name: 'Total_Neto', label: 'Total Neto' },
  { name: 'Origen', label: 'Origen' },
  { name: 'TipoDcto', label: 'Tipo Documento' },
  { name: 'NroDcto', label: 'Número Documento' },
];

function App() {
  const [query, setQuery] = useState({ combinator: 'and', rules: [] });
  const [queryResult, setQueryResult] = useState(mockData);
  const [sqlQuery, setSqlQuery] = useState('');

  const handleQueryChange = (query) => {
    setQuery(query);
    const queryString = formatQuery(query, 'json');
    console.log('Query:', queryString);

    // Filtrar los datos basados en la consulta
    const filteredData = mockData.filter((item) => {
      return query.rules.every((rule) => {
        if (rule.field && rule.value) {
          const fieldValue = item[rule.field];
          const ruleValue = rule.value;
          switch (rule.operator) {
            case '=':
              return fieldValue === ruleValue;
            case '!=':
              return fieldValue !== ruleValue;
            case '<':
              return fieldValue < ruleValue;
            case '<=':
              return fieldValue <= ruleValue;
            case '>':
              return fieldValue > ruleValue;
            case '>=':
              return fieldValue >= ruleValue;
            case 'contains':
              return fieldValue.includes(ruleValue);
            case 'beginsWith':
              return fieldValue.startsWith(ruleValue);
            case 'endsWith':
              return fieldValue.endsWith(ruleValue);
            default:
              return true;
          }
        }
        return true;
      });
    });

    setQueryResult(filteredData);
  };

  const handleShowQuery = () => {
    const queryString = formatQuery(query, 'sql');
    setSqlQuery(queryString);
  };

  const columns = [
    { header: 'Número Documento', accessor: 'NumeroDocumento' },
    { header: 'Bodega', accessor: 'Bodega' },
    { header: 'Cantidad Original', accessor: 'Cant_Original' },
    { header: 'Cantidad Remisionada', accessor: 'Cant_Remisionada' },
    { header: 'Centro Costos', accessor: 'Centro_Costos' },
    { header: 'Cod Ubicación', accessor: 'Cod_Ubicacion' },
    { header: 'Detalle', accessor: 'Detalle' },
    { header: 'Fecha Documento', accessor: 'Fecha_Dcto' },
    { header: 'Cliente', accessor: 'Cliente' },
    { header: 'Tipo Cartera', accessor: 'Tipo_Cartera' },
    { header: 'Tipo Movimiento', accessor: 'Tipo_Mvto' },
    { header: 'Vendedor', accessor: 'Vendedor' },
    { header: 'Nota', accessor: 'Nota' },
    { header: 'Enviado a', accessor: 'Enviadoa' },
    { header: 'Cod Ciudad Envío', accessor: 'CodCiudadEnvio' },
    { header: 'Orden Compra', accessor: 'OrdenCompra' },
    { header: 'Creó Factura', accessor: 'CREO_FACT' },
    { header: 'Impuestos', accessor: 'Impuestos' },
    { header: 'NIT', accessor: 'nit' },
    { header: 'Producto', accessor: 'Producto' },
    { header: 'Cod Rete', accessor: 'CodRete' },
    { header: 'Cod Retica', accessor: 'CodRetica' },
    { header: 'Total Bruto', accessor: 'Total_Bruto' },
    { header: 'Total Producto', accessor: 'Total_Prod' },
    { header: 'Total IVA', accessor: 'Total_IVA' },
    { header: 'Total Neto', accessor: 'Total_Neto' },
    { header: 'Origen', accessor: 'Origen' },
    { header: 'Tipo Documento', accessor: 'TipoDcto' },
    { header: 'Número Documento', accessor: 'NroDcto' },
  ];

  return (
    <div className="App container-fluid p-4">
      <h1 className="text-center text-primary mb-4">Query Builder</h1>
      <div className="query-builder-container mb-4 p-4 shadow-sm rounded bg-white">
        <QueryBuilder
          fields={fields}
          query={query}
          onQueryChange={handleQueryChange}
          className="p-3 border rounded bg-light"
        />
        <button className="btn btn-primary mt-3" onClick={handleShowQuery}>
          Mostrar Query
        </button>
      </div>
      {sqlQuery && (
        <div className="sql-query-container mb-4 p-4 shadow-sm rounded bg-white">
          <h2 className="text-center text-secondary mb-4">Consulta SQL</h2>
          <pre>{sqlQuery}</pre>
        </div>
      )}
      <div className="data-table-container p-4 shadow-sm rounded bg-white">
        <h2 className="text-center text-secondary mb-4">Resultados de la Consulta</h2>
        <DataTable columns={columns} data={queryResult} />
      </div>
    </div>
  );
}

export default App;