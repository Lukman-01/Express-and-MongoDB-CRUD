const express = require("express");
const mongoose = require('mongoose');

const app = express();

const indexRouter = require('./routes/index');


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
mongoose.connect('mongodb://localhost:27017/Todo')
.then(()=>{
    console.log("connected")
})
.catch(err=>{
    console.log(err.message);
    return err
})
app.use("/Todo", indexRouter);

app.listen(3000, () => {
    console.log("Server is listening.")
})