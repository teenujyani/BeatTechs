const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Course = require("./models/courses");
const methodOverride = require("method-override");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'))

async function main(){
  await mongoose.connect('mongodb://127.0.0.1:27017/beattechs');
}

main()
.then(()=>{console.log("Connected successfully")})
.catch((err)=>{console.log(err)});

let port = 8080;

app.listen(port,()=>{
  console.log("Server running at port 8080");
})

//read route 

app.get("/courses",async (req,res)=>{
  const allCourses = await Course.find({});
  res.render("courses/index.ejs",{allCourses});
})


// create route

app.get("/courses/new",(req,res)=>{
  res.render("courses/new.ejs");
})


app.post("/courses",async (req,res)=>{
  let {title,subtitle,description,price,image} = req.body;
  const course = new Course({
    title:title,
    subtitle:subtitle,
    description:description,
    price: price,
    image:image
  });
  await course.save()
  res.redirect("/courses");
})

//update route
app.get("/courses/:id/edit",async (req,res)=>{
  const {id} = req.params;
  const course = await Course.findById(id);
  res.render("courses/edit.ejs",{course});
})

app.patch("/course/:id",async (req,res)=>{
  const {id} = req.params;
  const {title,subtitle,description,price,image} = req.body;
  const update = {
    title: title,
    subtitle: subtitle,
    description: description,
    image: image,
    price: price
  }
  await Course.findByIdAndUpdate(id,update);
  res.redirect("/courses");
})

app.delete("/courses/:id/delete",async (req,res)=>{
  const {id} = req.params;
  await Course.findByIdAndDelete(id);
  res.redirect("/courses");
})