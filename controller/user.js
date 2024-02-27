const user_model=require('../models/user')
const {createHmac}=require("crypto");
const register_controller=async(req,resp)=>{
    console.log(req.body);
const {fullName,email,password}=req.body;
await user_model.create(
    {
       fullName,
       email, 
       password
    }
)
resp.redirect('/')
}

const login_controller=async(req,resp)=>{
    console.log(req.body);
    const {email,password}=req.body;
    try {
    //     const user=await user_model.find({email})
    //     console.log("user",user);
    //     console.log("salt",user[0].salt);
    //     const hash=createHmac('sha256',user[0].salt).update(password).digest('hex')
    //     console.log(hash);
    //      if(hash===user[0].password)
    //      {
    //         console.log("login success");
    //      }
    //      else{
    //         console.log("unsuccess");
    //      }
    //  
    const token=await user_model.matchPasswordGenerateToken(email,password)
    // console.log(user)
    console.log(token);
    resp.cookie('token',token);
    resp.redirect('/')
    } catch (error) {
        console.log(error);
        resp.render('login',{
            error:"incoorect password or username" //send in locals object in views
        })
    }
    
}
module.exports={register_controller,login_controller}

