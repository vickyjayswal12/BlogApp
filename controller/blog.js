const Blog = require("../models/blog");
const Comment = require("../models/comment");

const addnew_controller=async(req,resp)=>{
    // console.log(req.body);
    const {title,body}=req.body
    // console.log("file",req.file); //its comes becouse of useing multer mdlle ware after saving file into image thats details have
    const res=await Blog.create(
        {
          title,
          body,            //object destructuring
          coverImgUrl:`${req.file.filename}`, //req.file.filename get using multer 
          createdBy:req.user._id
        }
    )

    // console.log(res);
    resp.redirect('/')
}

const getblogBYId=async(req,resp)=>{
  try {
    // console.log(req.query.id);
    const blog= await Blog.findById(req.query.id).populate('createdBy') //(populate) get user details who is created this blog
    // resp.send(res)
    // console.log("blog",blog);
    resp.render('blog_datails',{
      user:req.user,
      blog
    })
  } catch (error) {
    console.log("err",error);
  }


}

const comment_controller=(req,resp)=>{
 const {content}=req.body;
 const blogId=req.params.blogId;
 console.log("blogid",req.params.blogId);
  const res=Comment.create({
    content,
    blog_id:blogId,
    createdBy:req.user._id
  })
resp.redirect(`/blog/?id=blogId`)
}
module.exports={addnew_controller,getblogBYId,comment_controller}