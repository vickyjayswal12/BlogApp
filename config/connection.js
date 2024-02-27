const mongoose=require('mongoose')

const connection=async()=>{
    try {
       await mongoose.connect("mongodb://localhost:27017/blog_app")
       console.log("db connected");
    } catch (error) {
        console.log(error)
    }
    
}
module.exports=connection;