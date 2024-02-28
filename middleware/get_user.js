const { varify_token } = require("../utilitis/jwt");

const getuser=(cookieName)=>
{
    // console.log("middleware",cookieName);
    return async (req,resp,next)=>{
        // console.log(req.cookies[cookieName]);
        if(!req.cookies[cookieName])
        {
            return next();
        }
        else{
            try {
                const user= await varify_token(req.cookies[cookieName]);
                //  console.log("user",user)
                 req.user=user
                  next();
                }
             catch (error) {
              
                console.log("error",error);
                next()
        }
        }
    }
}
module.exports=getuser;