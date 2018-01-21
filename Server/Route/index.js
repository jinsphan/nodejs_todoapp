var router = require("express").Router();
var usersRouter = require("./users");
var todosRouter = require("./todos");

router.use("/todos", todosRouter);
router.use("/users", usersRouter);

module.exports = router;