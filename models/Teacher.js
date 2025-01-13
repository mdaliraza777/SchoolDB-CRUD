const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
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
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    default: 9931821815,
  },
  address: {
    type: String,
    default: "India",
  },
});

const Teacher = mongoose.model("Teacher", TeacherSchema);
module.exports = Teacher;
