const mongoose = require("mongoose");
const timestamp = require('mongoose-timestamp');

mongoose.plugin(timestamp,{
  createdAt: "created",
  updatedAt: "updated"
})
const { Schema } = mongoose;

const todoSchema = new Schema({
  title:  {
    type: String,
    } ,
  description:  {
    type: String,
    } ,
   timestamp: {
    type: String,
    } 
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;