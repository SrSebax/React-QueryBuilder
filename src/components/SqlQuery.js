import React from 'react';
import PropTypes from 'prop-types';

const SQLQuery = ({ sqlQuery }) => {
  return (
    <div className="sql-query-display mt-4">
      <h5>Consulta SQL Generada:</h5>
      <pre className="sql-query">{sqlQuery}</pre>
    </div>
  );
};

SQLQuery.propTypes = {
  sqlQuery: PropTypes.string.isRequired,
};

export default SQLQuery;