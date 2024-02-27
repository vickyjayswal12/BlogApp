const {Router}=require('express');
const { register_controller, login_controller } = require('../controller/user');
const islogin = require('../middleware/is_login');
const rout=Router();

rout.get("/signin",(req,resp)=>{
    resp.render('login')
})
rout.post("/signin",login_controller)
rout.get('/signup',(req,resp)=>{
    resp.render('register')
})
rout.post('/signup',register_controller)

rout.get('/profile',islogin,(req,resp)=>{
    resp.send("profile")
})
rout.get('/logout',(req,resp)=>{
    resp.clearCookie("token").redirect('/')
})
module.exports=rout;