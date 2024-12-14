import React, { useState } from 'react';
import { QueryBuilder, formatQuery } from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from './components/DataTable';
import initialData from './data';

const fields = [
  { name: 'firstName', label: 'First Name' },
  { name: 'lastName', label: 'Last Name' },
  { name: 'age', label: 'Age' },
];

function App() {
  const [query, setQuery] = useState({ combinator: 'and', rules: [] });
  const [filteredData, setFilteredData] = useState(initialData);

  const handleQueryChange = (query) => {
    setQuery(query);
    const queryString = formatQuery(query, 'sql');
    console.log('SQL Query:', queryString);
    const filtered = initialData.filter((item) => {
      return query.rules.every((rule) => {
        if (rule.field === 'firstName') {
          return item.firstName.includes(rule.value);
        } else if (rule.field === 'lastName') {
          return item.lastName.includes(rule.value);
        } else if (rule.field === 'age') {
          return item.age === parseInt(rule.value, 10);
        }
        return true;
      });
    });
    setFilteredData(filtered);
  };

  return (
    <div className="App container mt-5">
      <div className="mb-4 p-4 shadow-sm rounded bg-white">
        <h1 className="text-center text-primary mb-4">React Query Builder</h1>
        <QueryBuilder
          fields={fields}
          query={query}
          onQueryChange={handleQueryChange}
          className="p-3 border rounded bg-light"
        />
      </div>
      <div className="p-4 shadow-sm rounded bg-white">
        <h2 className="text-center text-secondary mb-4">Filtered Data</h2>
        <DataTable data={filteredData} />
      </div>
    </div>
  );
}

export default App;
