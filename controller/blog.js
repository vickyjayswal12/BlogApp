const Blog = require("../models/blog");

const addnew_controller=async(req,resp)=>{
    console.log(req.body);
    const {title,body}=req.body
    console.log("file",req.file); //its comes becouse of useing multer mdlle ware after saving file into image thats details have
    const res=await Blog.create(
        {
          title,
          body,            //object destructuring
          coverImgUrl:`/public/uploads/${req.file.filename}`,
          createdBy:req.user._id
        }
    )

    // console.log(res);
    resp.redirect('/')
}
module.exports={addnew_controller}