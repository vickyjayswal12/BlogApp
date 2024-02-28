const {Router}=require('express');
const multer=require('multer');
const path=require('path');
const { addnew_controller, getblogBYId } = require('../controller/blog');

const storage = multer.diskStorage({
    destination: function (req, file, cb) { //cb ==callback  //here file which use to control file into request and file not comes in express(req,resp) so that we use multer or expressfile lib
      // console.log(path.resolve('./public'));
        return cb(null, path.resolve('./public/uploads/')) //if errror null than upoad file dest is ./uploads
    },
    filename: function (req, file, cb) {
     
     return cb(null, `${Date.now()}-${file.originalname}`)
    }
  })

  
const upload = multer({ storage: storage })
const rout=Router();

rout.get("/addnew",(req,resp)=>{
    resp.render('blog',{
        user:req.user
    })
})

rout.post("/addnew",upload.single("CoverImg"),addnew_controller)

//get blog in details by help of blog id
rout.get("/",getblogBYId)

module.exports=rout