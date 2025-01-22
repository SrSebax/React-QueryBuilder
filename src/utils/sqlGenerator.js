import validator from 'validator';

export const generateSQLQuery = (rules) => {
  if (rules.length === 0) return { conditions: '', values: [] };

  const sqlOperators = {
    '=': '=',
    '!=': '<>',
    '<': '<',
    '<=': '<=',
    '>': '>',
    '>=': '>=',
    'contains': 'LIKE',
    'beginsWith': 'LIKE',
    'endsWith': 'LIKE',
  };

  const conditions = [];
  const values = [];

  rules.forEach((rule, index) => {
    if (rule.field && rule.operator && rule.value) {
      const operator = sqlOperators[rule.operator];
      if (!operator) {
        throw new Error(`Operador no válido: ${rule.operator}`);
      }

      // Sanitize and validate the field name
      const field = validator.escape(rule.field);
      if (!validator.isAlphanumeric(field.replace(/_/g, ''))) {
        throw new Error(`Campo no válido: ${rule.field}`);
      }

      // Sanitize and validate the value
      let value = validator.escape(rule.value);
      if (rule.operator === 'contains') {
        value = `%${value}%`;
      } else if (rule.operator === 'beginsWith') {
        value = `${value}%`;
      } else if (rule.operator === 'endsWith') {
        value = `%${value}`;
      }

      conditions.push(`${field} ${operator} $${index + 1}`);
      values.push(value);
    }
  });

  if (conditions.length === 0) return { conditions: '', values: [] };

  const combinator = rules[0].combinator.toUpperCase();
  const conditionsText = conditions.join(` ${combinator} `);

  return { conditions: conditionsText, values };
};