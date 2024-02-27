const express=require('express');
const app=express();
const path=require('path')
const UserRout=require('./routs/user')
const cookieParser=require('cookie-parser')
const connection=require('./config/connection');
const getuser = require('./middleware/get_user');

//db connect
connection()

//app level middle
app.use(express.static(path.join(__dirname,"/public")))
app.set('view engine','ejs');
app.set('views',path.join(__dirname,"/views/pages"))
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())//for cookies parser
app.use(getuser("token")) //it will set req.user in every request with user data if in req have user have token into request(like passport.deserializeUser in passportjs)


app.use("/user",UserRout);
app.get("/",(req,resp)=>{
    // resp.send("hello");
    resp.render('home',{user:req.user})
})

// app.get("/login",(req,resp)=>{
//     // resp.send("hello");
//     resp.render('login')
// })


app.listen(5000);