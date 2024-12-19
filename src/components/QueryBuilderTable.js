import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQueryBuilderController } from '../controllers/queryBuilderController';
import { FaPlus, FaMinus } from 'react-icons/fa';
import SQLQuery from './SQLQuery';
import DataTable from './DataTable';
import { Offcanvas } from 'bootstrap';

const QueryBuilderTable = () => {
  const {
    rules,
    fields,
    operators,
    sqlQuery,
    data,
    handleAddRow,
    handleRemoveRow,
    handleFieldChange,
    handleOperatorChange,
    handleValueChange,
    handleCombinatorChange,
    generateSQLQuery,
  } = useQueryBuilderController();

  const columns = fields.map(field => ({
    header: field.label,
    accessor: field.name,
  }));

  const isQueryValid = rules.every(rule => rule.field && rule.operator && rule.value);

  const handleGenerateSQLQuery = () => {
    generateSQLQuery();
  };

  useEffect(() => {
    if (sqlQuery) {
      const offcanvasElement = document.getElementById('offcanvasSQLQuery');
      if (offcanvasElement) {
        const offcanvas = new Offcanvas(offcanvasElement);
        offcanvas.show();
      }
    }
  }, [sqlQuery]);

  return (
    <div className="query-builder-table-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">Generador de Informes</h1>
        <button
          className="btn btn-outline-success"
          type="button"
          onClick={handleGenerateSQLQuery}
          disabled={!isQueryValid}
        >
          Mostrar Query SQL
        </button>
      </div>
      <div className="table-responsive query-table mb-4">
        <table className="table table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Acciones</th>
              <th>Filtro</th>
              <th>Condicion</th>
              <th>Valor</th>
              <th>Y/O</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule, index) => (
              <tr key={index}>
                <td className="text-center">
                  <button className="btn btn-outline-danger btn-sm mr-2" onClick={() => handleRemoveRow(index)}>
                    <FaMinus />
                  </button>
                  <button className="btn btn-outline-primary btn-sm" onClick={handleAddRow}>
                    <FaPlus />
                  </button>
                </td>
                <td>
                  <select
                    className="form-control form-control-sm"
                    value={rule.field}
                    onChange={(e) => handleFieldChange(index, e.target.value)}
                  >
                    <option value="">Seleccione</option>
                    {fields.map((field) => (
                      <option key={field.name} value={field.name}>
                        {field.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    className="form-control form-control-sm"
                    value={rule.operator}
                    onChange={(e) => handleOperatorChange(index, e.target.value)}
                  >
                    <option value="">Seleccione</option>
                    {operators.map((operator) => (
                      <option key={operator.name} value={operator.name}>
                        {operator.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={rule.value}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                  />
                </td>
                <td>
                  <select
                    className="form-control form-control-sm"
                    value={rule.combinator}
                    onChange={(e) => handleCombinatorChange(index, e.target.value)}
                  >
                    <option value="and">Y</option>
                    <option value="or">O</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sqlQuery && <SQLQuery sqlQuery={sqlQuery} />}
      <div className="table-responsive data-table mb-4">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

QueryBuilderTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
    })
  ),
  data: PropTypes.arrayOf(PropTypes.object),
};

export default QueryBuilderTable;