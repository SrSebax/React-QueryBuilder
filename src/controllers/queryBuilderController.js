import { useState } from 'react';
import { fields, operators } from '../models/queryBuilderModel';
import { generateSQLQuery as generateSQL } from '../utils/sqlGenerator';
import mockData from '../mockData'; // Assuming you have some mock data

export const useQueryBuilderController = () => {
  const [rules, setRules] = useState([{ field: '', operator: '', value: '', combinator: 'and' }]);
  const [sqlQuery, setSqlQuery] = useState('');
  const [data, setData] = useState(mockData);

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
    updateData(newRules);
  };

  const handleOperatorChange = (index, operator) => {
    const newRules = [...rules];
    newRules[index].operator = operator;
    setRules(newRules);
    updateData(newRules);
  };

  const handleValueChange = (index, value) => {
    const newRules = [...rules];
    newRules[index].value = value;
    setRules(newRules);
    updateData(newRules);
  };

  const handleCombinatorChange = (index, combinator) => {
    const newRules = [...rules];
    newRules[index].combinator = combinator;
    setRules(newRules);
    updateData(newRules);
  };

  const generateSQLQuery = () => {
    try {
      const query = generateSQL(rules);
      setSqlQuery(query);
      updateData(rules);
    } catch (error) {
      console.error('Error generating SQL query:', error);
      setSqlQuery('');
    }
  };

  const updateData = (rules) => {
    // Filter data based on rules
    const filteredData = mockData.filter((item) => {
      return rules.every((rule) => {
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
              return typeof fieldValue === 'string' && fieldValue.includes(ruleValue);
            case 'beginsWith':
              return typeof fieldValue === 'string' && fieldValue.startsWith(ruleValue);
            case 'endsWith':
              return typeof fieldValue === 'string' && fieldValue.endsWith(ruleValue);
            default:
              return true;
          }
        }
        return true;
      });
    });

    setData(filteredData);
  };

  return {
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
  };
};
