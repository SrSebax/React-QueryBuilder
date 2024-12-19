import { useState } from 'react';
import { fields, operators } from '../models/queryBuilderModel';
import { generateSQLQuery as generateSQL } from '../utils/sqlGenerator';

export const useQueryBuilderController = () => {
  const [rules, setRules] = useState([{ field: '', operator: '', value: '', combinator: 'and' }]);
  const [sqlQuery, setSqlQuery] = useState('');

  const handleAddRow = () => {
    setRules([...rules, { field: '', operator: '', value: '', combinator: 'and' }]);
  };

  const handleRemoveRow = (index) => {
    const newRules = rules.filter((_, i) => i !== index);
    setRules(newRules);
  };

  const handleFieldChange = (index, field) => {
    const newRules = [...rules];
    newRules[index].field = field;
    setRules(newRules);
  };

  const handleOperatorChange = (index, operator) => {
    const newRules = [...rules];
    newRules[index].operator = operator;
    setRules(newRules);
  };

  const handleValueChange = (index, value) => {
    const newRules = [...rules];
    newRules[index].value = value;
    setRules(newRules);
  };

  const handleCombinatorChange = (index, combinator) => {
    const newRules = [...rules];
    newRules[index].combinator = combinator;
    setRules(newRules);
  };

  const generateSQLQuery = () => {
    const query = generateSQL(rules);
    setSqlQuery(query);
  };

  return {
    rules,
    fields,
    operators,
    sqlQuery,
    handleAddRow,
    handleRemoveRow,
    handleFieldChange,
    handleOperatorChange,
    handleValueChange,
    handleCombinatorChange,
    generateSQLQuery,
  };
};