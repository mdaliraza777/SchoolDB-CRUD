const express = require("express");
const router = express();
const Teacher = require("./../models/Teacher");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newTeacher = new Teacher(data);
    const response = await newTeacher.save();
    console.log("Data saved successfully");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Teacher.find();
    console.log("Data Fetched Successfully");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  const teacherId = req.params.id;
  try {
    const response = await Teacher.findById(teacherId);
    console.log("Teacher Data Featched");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(200).json({ error: "Internal Server Error" });
  }
});

router.get("/gender/:genderType", async (req, res) => {
  const genderType = req.params.genderType;
  try {
    if (
      genderType == "male" ||
      genderType == "female" ||
      genderType == "other"
    ) {
      const response = await Teacher.find({ gender: genderType });
      console.log("Response Featched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "internal server error if condition" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const teacherId = req.params.id;
    const updateData = req.body;
    const response = await Teacher.findByIdAndUpdate(teacherId, updateData, {
      new: true, // return the updated document
      runValidators: true, // run the mongoose validators
    });

    if (!response) {
      res.status(404).json({ error: "Teacher Not Found" });
    }

    console.log("Teacher Data Updated successfully");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const teacherId = req.params.id;
    const response = await Teacher.findByIdAndDelete(teacherId);

    if (!response) {
      res.status(404).json({ error: "Teacher Not Found" });
    }
    console.log("Data deleted");
    res.status(200).json({ message: "Teacher data deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
