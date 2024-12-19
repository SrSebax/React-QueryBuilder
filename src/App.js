import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import QueryBuilderTable from './components/QueryBuilderTable';
import './App.css';

function App() {
  return (
    <div className="App container-fluid p-4">
      <QueryBuilderTable />
    </div>
  );
}

export default App;