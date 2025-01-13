const express = require("express");
const router = express();
const Student = require("./../models/Student");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newStudent = new Student(data);
    const savedData = await newStudent.save();
    console.log("Student data saved sucessfully!");
    res.status(200).json(savedData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Student.find();
    console.log("Data fetched Successfully");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/:id', async (req, res) => {
    const studentId = req.params.id;
    try {
        const response = await Student.findById(studentId);
        console.log('Student Data fetched by Id');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal Server Error" });
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
      const response = await Student.find({ gender: genderType });
      console.log("Data fetched by genderType Featched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "internal server error if condition" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.put('/:id', async (req, res) => {
    try {
      const studentId = req.params.id;
      const updateData = req.body;
      const response = await Student.findByIdAndUpdate(studentId, updateData, {
      new: true, // return the updated document
      runValidators: true, // run mongoose validations
      });

      if(!response){
        return res.status(404).json({error: "Student not found"});
      }
      console.log("Student data updated successfully");
      res.status(200).json(response);
      
    } catch (error) {
      console.log(error);
      res.status(500).json({error: "Internal server error1"});
    }
});

router.delete('/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    const response = await Student.findByIdAndDelete(studentId);

    if(!response){
      res.status(404).json({error: "Student not found"});
    }
    console.log("Data deleted");
    res.status(200).json({message: "Student data deleted successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Internal Server Error"});
  }
});

module.exports = router;
