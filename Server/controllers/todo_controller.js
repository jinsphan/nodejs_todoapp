var todo_model = require("../models/todos");

const getTodosByUser = (req, res) => {
  todo_model.getTodosByUser(req.payload.id, (er, result) => {
    if (er) res.status(400).send("Bad request!");
    else {
      res.status(200).json(result);
    }
  })
}

const addTodo = (req, res) => {
  todo_model.addTodo(req.payload.id, req.body, (er, result) => {
    if(er) res.status(400).send("Bad request!");
    else {
      res.status(200).json(result);
    }
  })
}

const deleteTodos = (req, res) => {
  todo_model.deleteTodos(req.payload.id, req.body, (er, result) => {
    if (er) res.status(400).send("Bad request!");
    else {
      res.status(200).send("Delete Successful");
    }
  })
}

const checkedTodo = (req, res) => {
  todo_model.checkedTodo(req.payload.id, req.body.id, (er, result) => {
    if (er) res.status(400).send("Bad request!");
    else {
      res.status(200).send("CheckedTodo Successful");
    }
  })
}

module.exports = {
  getTodosByUser,
  addTodo,
  deleteTodos,
  checkedTodo,
}