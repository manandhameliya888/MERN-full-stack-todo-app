import React, { useEffect, useState } from "react";
import { formatDateDDMMYYYY, formateDateYYYYMMDD } from "../lib/date";

export const TodoForm = ({ addTodo, editTodo, editTask, isEdit, clearForm }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (isEdit) {
      formateDateYYYYMMDD(editTodo?.dueDate);
      setTitle(editTodo?.title);
      setDueDate(
        editTodo?.dueDate ? formateDateYYYYMMDD(editTodo?.dueDate) : ""
      );
      setReminderDate(
        editTodo?.reminderDate
          ? formateDateYYYYMMDD(editTodo?.reminderDate)
          : ""
      );
      setDescription(editTodo?.description);
      setStatus(editTodo?.status ? editTodo?.status : "To Do")
    }
  }, [isEdit, editTodo?._id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      const data = {
        title,
        description,
        dueDate: dueDate ? formatDateDDMMYYYY(dueDate) : dueDate,
        reminderDate: reminderDate
          ? formatDateDDMMYYYY(reminderDate)
          : reminderDate,
        status: status ? status : "To Do",
      };
      if (!dueDate) delete data.dueDate;
      if (!reminderDate) delete data.reminderDate;
      if (!description) delete data.description;
      if (isEdit) {
        editTask(data, editTodo._id);
      } else {
        addTodo(data);
      }
      setTitle("");
      setDueDate("");
      setReminderDate("");
      setDescription("");
      setStatus("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <div className="flex flex-col">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="todo-input"
          placeholder="Enter Title"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="due-date">Due Date</label>
        <input
          type="date"
          id="due-date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="todo-input"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="reminder-date">Reminder Date</label>
        <input
          type="date"
          id="reminder-date"
          value={reminderDate}
          onChange={(e) => setReminderDate(e.target.value)}
          className="todo-input"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Enter Description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          className="todo-description"
        ></textarea>
      </div>
      {isEdit && (
        <div className="flex flex-col">
          <label htmlFor="reminder-date">Status</label>
          <select
            name=""
            id=""
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option className="!text-black" value="To Do">
              To Do
            </option>
            <option className="!text-black" value="Pending">
              Pending
            </option>
            <option className="!text-black" value="Done">
              Done
            </option>
          </select>
        </div>
      )}
      <button disabled={!title} type="submit" className="todo-btn">
        {isEdit ? "Edit" : "Add"} Task
      </button>
      {isEdit && <button onClick={clearForm} type="submit" className='todo-btn'>Clear Form</button>}
    </form>
  );
};
