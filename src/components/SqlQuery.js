import React from 'react';
import PropTypes from 'prop-types';

const SQLQuery = ({ sqlQuery }) => {
  return (
    <>
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasSQLQuery" aria-labelledby="offcanvasSQLQueryLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasSQLQueryLabel">Consulta SQL Generada</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <pre className="sql-query">{sqlQuery}</pre>
        </div>
      </div>
    </>
  );
};

SQLQuery.propTypes = {
  sqlQuery: PropTypes.string.isRequired,
};

export default SQLQuery;