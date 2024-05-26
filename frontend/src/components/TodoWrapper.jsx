import React, { useEffect, useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { axiosInstance } from "../service/instance";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState({});
  const [isEditTodo, setIsEditTodo] = useState(false)

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axiosInstance.get('/api/todo');
        setTodos(response?.data?.todo)
      } catch (error) {
        console.error("error while fetching data", error);
      }  
    };

    fetchTodos();
  }, []);

  const addTodo = async (todo) => {
    try {
      const response = await axiosInstance.post('/api/todo', todo);
      setTodos([
        ...todos,
        response?.data?.todo || todo,
      ]);
    } catch (error) {
      console.error("Error while adding Todo", error);
    }
  }

  const deleteTodo = async (id) => {
    try {
      const confirm = window.confirm("Are you sure want to Delete this Todo?");
      if (confirm) {
        const response = await axiosInstance.delete(`/api/todo/${id}`);
        setTodos(todos.filter((todo) => todo._id !== id));
      }
      
    } catch (error) {
      console.error("Error while deleting Todo", error);
    }
  }

  const putEditTodo = (todo) => {
    setEditTodo(todo);
    if(todo._id){
      setIsEditTodo(true)
    }else {
      setIsEditTodo(false)
    }
  }

  const editTask = async (todo, id) => {
    try {
      const response = await axiosInstance.put(`/api/todo/${id}`, todo);

      setTodos(
        todos.map((item) =>
          item._id === id ? response?.data?.updatedTodo : item
        )
      );
      if(response){
        setIsEditTodo(false)
      }

    } catch (error) {
      console.error("Error while edit Todo", error);
    }
  };

  const clearForm = () => {
    setEditTodo({});
    setIsEditTodo(false);
  }

  return (
    <div className="TodoWrapper">
      <TodoForm isEdit={isEditTodo} editTask={editTask} editTodo={editTodo} addTodo={addTodo} />
      {todos.map((todo) =>(
        <Todo
          key={todo._id}
          task={todo}
          deleteTodo={deleteTodo}
          putEditTodo={putEditTodo}
          clearForm={clearForm}
        />
      ))}
    </div>
  );
};
