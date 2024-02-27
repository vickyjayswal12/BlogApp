const { varify_token } = require("../utilitis/jwt");

const islogin=async(req,resp,next)=>{

    if(!req.cookies.token)
    {
        resp.redirect('signin')//always redirct same paths singin like/user/singin
    }
    else{
        try {
            const user= await varify_token(req.cookies.token);
             console.log("user",user)
             req.user=user
              next();
            }
         catch (error) {
            if(error="TokenExpiredError")
            {
                resp.redirect('signin')

            }
            console.log("error",error);
    }
    
    
    }
}
module.exports=islogin;