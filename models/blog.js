const {Schema,model}=require('mongoose');

const blog_schema=new Schema({
   title:{
   type:String,
   required:true
   },
   body:{
       type:String,
       required:true
   },
   coverImgUrl:{
       type:String,
   },
  createdBy:{
    type:Schema.Types.ObjectId, //connect with another model
    ref:'user' //model name model("user",user_schema);

  }
 
}, { timestamps: true })  
const Blog=model("blog",blog_schema);
module.exports=Blog;




//workin of created by

// In the provided Mongoose schema for a blog, the `createdBy` field represents the user who created the blog post. This field is of type `Schema.Types.ObjectId`, which means it stores the unique identifier (ObjectId) of a document from another collection in MongoDB. This ObjectId references a document in the "user" collection.

// Here's a detailed explanation of the `createdBy` field:

// - `type: Schema.Types.ObjectId`: This indicates that the `createdBy` field will store the ObjectId of a document from another collection.
  
// - `ref: 'user'`: This specifies the name of the model that the `createdBy` field refers to. In this case, it refers to the "user" model. When Mongoose populates this field, it will look for documents in the "user" collection based on the ObjectId stored in the `createdBy` field.

// This setup allows you to establish a relationship between the blog post and the user who created it. By referencing the ObjectId of the user document, you can easily retrieve information about the user who created a particular blog post.

// When you query a blog post document, you can use Mongoose's `populate()` method to automatically replace the ObjectId in the `createdBy` field with the actual user document it references. This allows you to access fields from the user document directly within the populated `createdBy` field.

// Here's an example of how you might use `populate()` to retrieve a blog post with the associated user information:

// ```javascript
// const Blog = require('./models/Blog');

// Blog.findById(blogId)
//   .populate('createdBy')
//   .exec((err, blog) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(blog);
//       // Access user information through blog.createdBy
//     }
//   });
// ```

// In summary, the `createdBy` field in the blog schema establishes a relationship between the blog post and the user who created it, allowing you to easily access user information associated with a particular blog post.