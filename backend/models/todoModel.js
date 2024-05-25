const mongoose = require("mongoose");

// Custom validator for date format dd/mm/yyyy
const dateValidator = (value) => {
  return /^\d{2}\/\d{2}\/\d{4}$/.test(value);
};

const todoSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add the todo title."],
    },
    description: {
      type: String,
      required: [false],
    },
    status: {
      type: String,
      required: [true, "Please select at least one status."],
      enum: ["To Do", "Pending", "Done"],
    },
    dueDate: {
      type: String,
      required: [false],
      // validate: {
      //   validator: dateValidator,
      //   message: (props) =>
      //     `${props.value} is not a valid date! Please use the format dd/mm/yyyy.`,
      // },
    },
    reminderDate: {
      type: String,
      required: [false],
      // validate: {
      //   validator: dateValidator,
      //   message: (props) =>
      //     `${props.value} is not a valid date! Please use the format dd/mm/yyyy.`,
      // },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", todoSchema);
