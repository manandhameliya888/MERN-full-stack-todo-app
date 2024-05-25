const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Todo = require("../models/todoModel");

const getTodos = asyncHandler(async (req, res) => {
  try {
    const todo = await Todo.find({ user_id: req.user.id });
    res.status(200).json({ message: "Get All Todo", todo });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const createTodo = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      status,
      description = "",
      dueDate = "",
      reminderDate = "",
    } = req.body;

    if (!title || !status) {
      res.status(400);
      throw new Error("All fields are Mandatory(title, status)");
    }

    const todo = await Todo.create({
      user_id: req.user.id,
      title,
      description,
      status,
      dueDate,
      reminderDate,
    });

    res.status(201).json({ message: "Todo created successfully", todo });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const getTodo = asyncHandler(async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: new ObjectId(req.params.id),
      user_id: req.user.id,
    });

    if (!todo) {
      res.status(404);
      throw new Error("Todo Not Found!");
    } else {
      res.status(200).json({ message: `Get Todo for ${req.params.id}`, todo });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const updateTodo = asyncHandler(async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: new ObjectId(req.params.id),
      user_id: req.user.id,
    });

    if (!todo) {
      res.status(404);
      throw new Error("Todo Not Found!");
    }

    const {
      title,
      status,
      description = "",
      dueDate = "",
      reminderDate = "",
    } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        status,
        dueDate,
        reminderDate,
      },
      {
        new: true,
      }
    );

    res
      .status(200)
      .json({ message: `Update Todo for ${req.params.id}`, updatedTodo });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const deleteTodo = asyncHandler(async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: new ObjectId(req.params.id),
      user_id: req.user.id,
    });

    if (!todo) {
      res.status(404);
      throw new Error("Todo Not Found!");
    }

    await Todo.deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(200).json({ message: `Delete Todo for ${req.params.id}`, todo });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

module.exports = {
  getTodo,
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
};
