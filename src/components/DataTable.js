import React from 'react';

function DataTable({ data }) {
  return (
    <div className="card shadow-sm">
      <div className="card-header bg-secondary text-white">
        <h2>Data Table</h2>
      </div>
      <div className="card-body">
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;