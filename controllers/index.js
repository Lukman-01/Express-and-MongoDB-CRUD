const express = require('express');
const mongoose = require('mongoose');
const Todo = require('../models/index');


exports.getTodoList = async(req,res) => {
  try{
    const todos = await Todo.find({});
    res.status(200).json({
      message: "All Todo Available",
      todos
    });
    
  } catch (err){
    res.status(500).json({message: err});
  }
};

exports.getTodo = (req, res) => {
  const id = req.params.id;
  Todo.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Todo with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Todo with id=" + id });
    });
};

exports.createTodo = (req, res) => {
  console.log(req.body);
  if (!req.body?.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
  });
  todo
    .save((err,data)=>{
      if(err){
        res.status(500).send({
          message:
          err.message || "Some error occurred while creating the Tutorial."
        });
      }
      console.log(data)
      res.json({status: "Successfully added", data: data})
    })
};

exports.updateTodo = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  Todo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Todo with id=${id}. Maybe Todo was not found!`
        });
      } else res.send({ message: "Todo was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Todo with id=" + id
      });
    });
};

exports.removeTodo = (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`
        });
      } else {
        res.send({
          message: "Todo was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Todo with id=" + id
      });
    });
};
