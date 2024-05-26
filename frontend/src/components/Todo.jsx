import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const Todo = ({ task, deleteTodo, putEditTodo }) => {
  function getCurrentDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
  }
  const getTodoColor = (status, dueDtate, reminderDate) => {
    if (status === "To Do" && !(dueDtate || reminderDate)) {
      return "todo-task";
    }
    if (status === "Pending" || !(dueDtate || reminderDate)) {
      return "todo-pending";
    }
    if (status === "Done" || !(dueDtate || reminderDate)) {
      return "todo-done";
    }
    // if (dueDtate === getCurrentDate() || reminderDate === getCurrentDate()) {
    if (dueDtate === getCurrentDate()) {
      return "todo-dateSame";
    }
  };
  return (
    <div
      className={`Todo ${getTodoColor(
        task?.status,
        task?.dueDate,
        task?.reminderDate
      )}`}
    >
      <div className="flex gap-2 justify-between">
        <p
          className={`text-xl font-semibold flex items-center gap-2 ${
            task.completed ? "completed" : "incompleted"
          }`}
        >
          {task?.title}
          <strong className="text-3xl">·</strong>{" "}
          <span className="text-base font-normal">{task?.status}</span>
        </p>
        <div>
          <FontAwesomeIcon
            className="edit-icon"
            icon={faPenToSquare}
            onClick={() => putEditTodo(task)}
          />
          <FontAwesomeIcon
            className="delete-icon"
            icon={faTrash}
            onClick={() => deleteTodo(task._id)}
          />
        </div>
      </div>
      {task?.description ? (
        <div className="mt-2 text-md">{task?.description}</div>
      ) : null}
      {(task?.dueDate || task?.reminderDate) && (
        <div className="flex justify-between items-center">
          {task?.dueDate && <div className="mt-2 text-md">Due Date: {task?.dueDate || ""}</div>}
          {task?.reminderDate && <div className="ml-auto mt-2 text-md">
            Reminder Date: {task?.reminderDate || ""}
          </div>}
        </div>
      )}
    </div>
  );
};
