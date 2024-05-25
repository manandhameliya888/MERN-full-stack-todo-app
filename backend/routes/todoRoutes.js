const express = require("express");
const {
  getTodo,
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} = require("../controller/todoController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

// This is another way to use the middleware for verifying the token and calling the controller when there are comman endpoints
router.use(validateToken);

router.route("/").get(getTodos).post(createTodo);

router.route("/:id").get(getTodo).put(updateTodo).delete(deleteTodo);
module.exports = router;
