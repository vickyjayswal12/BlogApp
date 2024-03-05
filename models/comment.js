const {Schema,model}=require('mongoose');

const comment_schema=new Schema({
   content:{
   type:String,
   required:true
   },
   blog_id:{
    type:Schema.Types.ObjectId, //connect with another model
    ref:'blog' //model name model("blog",blog_schema);
  },
  createdBy:{
    type:Schema.Types.ObjectId, //connect with another model
    ref:'user' //model name model("user",user_schema);

  }
 
}, { timestamps: true })  
const Comment=model("comment",comment_schema);
module.exports=Comment;

