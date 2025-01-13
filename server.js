const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');
const PORT = process.env.PORT || 3000;
require('dotenv').config();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("welcome to our school management project");
});

const TeacherRoutes = require('./routes/TeacherRoutes');
const StudentRoutes = require('./routes/StudentRoutes');

app.use('/teacher', TeacherRoutes);
app.use('/student', StudentRoutes);


app.listen(PORT, () => {
    console.log("Server is listning on port No: 3000");    
});
