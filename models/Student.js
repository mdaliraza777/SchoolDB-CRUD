const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  grade: {
    type: String,
  },
  address: {
    type: String,
    default: "India",
  },
});

const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
