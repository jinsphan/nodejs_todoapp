const getUpdateStatement = (table, id, field) => {
  let sql_statement = `UPDATE ${table} SET `;
  Object.keys(field).forEach(key => {
    sql_statement += `${key} = '${field[key]}',`;
  })
  sql_statement = sql_statement.slice(0,sql_statement.length-1);
  sql_statement += ` WHERE id = ${id}`;
  return sql_statement;
}

module.exports = {
  getUpdateStatement,
}