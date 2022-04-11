const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const Schema=mongoose.Schema;

const userSchema=new Schema({
    fname:{type:String,required:true},
    lname:{type:String,required:true},
    mobile_no:{type:Number,required:true,unique: true},
    email:{type:String,required:true,unique:true},
    gender:{type:String,required:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,required:true,default:false}

})

userSchema.pre('save',function(next){
    if(this.password && this.isModified('password'))
    { 
        // 10 is salt adding additional security layer
        bcrypt.hash(this.password,10,(err,hashed)=>{
            if(err) return next(err);
            this.password=hashed;// saved into database
            next();

        })
    }else
    {
        next();
    }
})

userSchema.methods.checkPassword=function(password,cb){
    bcrypt.compare(password,this.password,(err,result)=>{
        console.log('this password',this.password);
        if(err) return err;
       return  cb(err,result);// cb is call back function
    })

}

userSchema.methods.createToken=function(){
    try{
        let payload={
            fname:this.fname,
            email:this.email,
            id:this._id
        };
        let token=jwt.sign(payload,process.env.private_key,{
            expiresIn:process.env.JWT_EXPIRES_IN
        });
        return token;

    }catch(error){
        console.log("Token error called.")
        return error
    }
}




const User=mongoose.model('User',userSchema);
module.exports=User;