const express=require('express');
const app=express();
const path=require('path')
const UserRout=require('./routs/user')
const connection=require('./config/connection')

//db connect
connection()

//app level middle
app.use(express.static(path.join(__dirname,"/public")))
app.set('view engine','ejs');
app.set('views',path.join(__dirname,"/views/pages"))
app.use(express.urlencoded({extended:false}))

app.use("/user",UserRout);
app.get("/",(req,resp)=>{
    // resp.send("hello");
    resp.render('home')
})

// app.get("/login",(req,resp)=>{
//     // resp.send("hello");
//     resp.render('login')
// })


app.listen(5000);