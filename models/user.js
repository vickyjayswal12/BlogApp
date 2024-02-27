 const {Schema,model}=require('mongoose');
 const {createHmac,randomBytes}=require("crypto");
const { get_token } = require('../utilitis/jwt');




 const user_schema=new Schema({
    fullName:{
    type:String,
    required:true
    },
    email:{
        type:String,
        required:true
    },
    salt:{
        type:String,
     
    },
    password:{
        type:String,
        required:true
    },
    ProImgUrl:{
        type:String,
        default:"/img/default.jpg"
    },
    role:{
       type:String,
       enum:["USER","ADMIN"],
       default:"USER"
    },
  
}, { timestamps: true })  //timestamp for created at and updated at

//before save, this function call and hash user password
user_schema.pre('save',function(next){
const user=this  // at time of save whih object went to save reference that object 
if(!user.isModified('password')) return;
const salt=randomBytes(16).toString();
const haspass=createHmac('sha256',salt).update(user.password).digest('hex') //digest means return value
this.salt=salt;
this.password=haspass;
next(); //call next function which was save
})

// ceate virtual function in schema for compare password for user 
user_schema.static(
    "matchPasswordGenerateToken",                    //this was function name in model
    async function (email, password) {
      const user = await this.findOne({ email });
      if (!user) throw new Error("User not found!");
  
      const salt = user.salt;
      const hashedPassword = user.password;
  
      const userProvidedHash = createHmac("sha256", salt)
        .update(password)
        .digest("hex");
  
      if (hashedPassword !== userProvidedHash)
        throw new Error("Incorrect Password");
        
        else{
            const token=await get_token(user._doc)
            // return {...user._doc,password:undefined,salt:undefined}
            return token
        
        }
     
    }
  );
const User=model("user",user_schema);
module.exports=User;




// Certainly! The provided code snippet seems to be a pre-save hook (middleware) for Mongoose schema, which is executed before saving a user object into the database. Let's break it down step by step:

// 1. **Schema Pre-Save Hook Registration**:
//    ```javascript
//    user_schema.pre('save', function(next) {
//    ...
//    });
//    ```
//    This line registers a pre-save middleware function for the 'save' event on the user schema. This means that before a user document is saved into the database, this middleware function will be executed.

// 2. **Accessing the User Object**:
//    ```javascript
//    const user = this;
//    ```
//    Inside the middleware function, `this` refers to the user document that is about to be saved. This line saves a reference to the user object for further processing.

// 3. **Checking for Password Modification**:
//    ```javascript
//    if (!user.isModified('password')) return;
//    ```
//    This line checks whether the password field of the user object has been modified. If not, it returns early, indicating that there's no need to re-hash the password.

// 4. **Generating Salt and Hashing Password**:
//    ```javascript
//    const salt = randomBytes(16).toString();
//    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex');
//    ```
//    Here, a random salt is generated using `randomBytes()` function. Then, the password is hashed using the SHA-256 algorithm and the generated salt. The hashed password is stored in the `hashedPassword` variable.

// 5. **Updating User Object**:
//    ```javascript
//    this.salt = salt;
//    this.password = hashedPassword;
//    ```
//    The salt and hashed password are then assigned to the corresponding fields (`salt` and `password`) of the user object (`this`).

// 6. **Calling the `next` Function**:
//    ```javascript
//    next();
//    ```
//    Finally, the `next()` function is called to proceed with the save operation. This is crucial to ensure that the save operation continues after the middleware has finished its processing.

// This middleware ensures that the user's password is properly hashed before saving it into the database, enhancing security.

// One thing to note is that in the code snippet provided, there seems to be a typo in `slat` instead of `salt` while creating the hash. It should be fixed to ensure correct functionality.