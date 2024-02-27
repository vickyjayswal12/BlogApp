const {Router}=require('express');
const { register_controller, login_controller } = require('../controller/user');
const rout=Router();

rout.get("/singin",(req,resp)=>{
    resp.render('login')
})
rout.post("/signin",login_controller)
rout.get('/singup',(req,resp)=>{
    resp.render('register')
})
rout.post('/signup',register_controller)

module.exports=rout;