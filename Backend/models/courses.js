const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coursesSchema = new Schema({
  title:{
    type:String
  },
  subtitle:{
    type:String
  },
  description:{
    type:String
  },
  image:{
    type:String
  },
  price:{
    type:Number
  }
});

const Course = new mongoose.model("Course",coursesSchema);

module.exports = Course;
