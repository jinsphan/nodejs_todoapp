var con = require("./index");
var utils = require("./utils");

const getTodosByUser = (user_id, callback) => {
  const statement = "SELECT * FROM todos WHERE user_id = ?";
  con.getConnection((err, sql) => {
    sql.query(statement, [user_id], (er, result) => {
      if (er || result.length === 0) callback(true);
      else callback(null, result);
    })
  })
}

const getTodosById = (id, callback) => {
  const statement = "SELECT * FROM todos WHERE id = ?";
  con.getConnection((err, sql) => {
    sql.query(statement, [id], (er, result) => {
      if (er || result.length === 0) callback(true);
      else callback(null, result[0]);
    })
  })
}

const addTodo = (user_id, todo, callback) => {
  const statement = "INSERT INTO todos (user_id, name, deadline) VALUES(?, ?, ?)";
  con.getConnection((err, sql) => {
    sql.query(statement, [user_id, todo.name, todo.deadline], (er, result) => {
      if (er) {
        callback(true);
      } else {
        getTodosByUser(user_id, (er, result) => {
          if (er) callback(true);
          else callback(null, result[result.length-1]);
        })
      }
    })
  })
}

const deleteTodos = (user_id, arId, callback) => {
  let statement = "DELETE FROM todos WHERE ";
  arId.forEach(todo_id => {
    statement += `id = '${todo_id}' OR `;
  });
  statement = statement.slice(0, statement.length-3);
  checkTodoAuth(user_id, arId, (er, result) => {
    if (er) callback(true);
    else {
      con.getConnection((er, sql) => {
        sql.query(statement, (er, result) => {
          if (er) callback(true);
          else callback(null, result);
        })
      })
    }
  })
}

const checkedTodo = (user_id, todo_id, callback) => {
  statement = "UPDATE todos SET done = 1 - todos.done WHERE id = ?";
  checkTodoAuth(user_id, [todo_id], (er, result) => {
    if (er) callback(true);
    else {
      con.getConnection((er, sql) => {
        sql.query(statement, [todo_id], (er, result) => {
          if (er) callback(true);
          else callback(null, result);
        })
      })
    }
  })
}

const checkTodoAuth = (user_id, arId, callback) => {
  getTodosByUser(user_id, (er, result) => {
    if (er) callback(true);
    else {
      let check = true;
      const arTodoIdByUser = result.map(todo=>todo.id);
      arId.forEach(id => {
        if (!arTodoIdByUser.includes(id)) check = false;
      });
      callback(!check, callback);
    }
  })
}

module.exports = {
  getTodosByUser,
  addTodo,
  deleteTodos,
  checkedTodo,
}