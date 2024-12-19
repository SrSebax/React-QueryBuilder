export const generateSQLQuery = (rules) => {
    if (rules.length === 0) return '';
  
    let query = 'SELECT * FROM Table WHERE ';
    const conditions = rules.map((rule) => {
      if (rule.field && rule.operator && rule.value) {
        return `${rule.field} ${rule.operator} '${rule.value}'`;
      }
      return null;
    }).filter(Boolean);
  
    query += conditions.join(` ${rules[0].combinator.toUpperCase()} `);
    return query;
  };