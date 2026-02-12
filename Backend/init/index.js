const mongoose = require("mongoose");
const Course = require("../models/courses");
const initData = require("./data.js");

async function main(){
  await mongoose.connect('mongodb://127.0.0.1:27017/beattechs');
}

main()
.then(()=>{console.log("Connected successfully")})
.catch((err)=>{console.log(err)});

const add = async () =>{
  await Course.deleteMany({});
  Course.insertMany(initData.data).then(()=>{
    console.log("Data added successfully");
  }).catch((err)=>{
    console.log(err);
  });

}

add();