userModel=require('../Models/Users');

exports.insertUser=async(req,res)=>{


  try{
      const user=await userModel.findOne({email:req.body.email})
      if(user)
       {
         return res.status(500).json({'inserted':false});

       }

       //const userInsert=new userModel(req.body);
       //const result=await userInsert.save();
        const result=await userModel.create(req.body);
       if(!result)
          return res.status(200).json({'inserted':false})
       else 
         return  res.status(201).json({'inserted':true});
     } 
  catch(error)
     {
       console.log(error);
       return  res.status(500).json({'inserted':false});
     }
}

exports.findAllUser=async(req,res)=>{

  try{  
    const result=await userModel.find({isAdmin:false},{password:0,isAdmin:0}).sort({fname:1})
    console.log(result);
       
       if(!result)
           return res.status(204).json({'users':result});
       else
           return res.status(200).json({'users':result});


     }catch(error)
     {
       console.error('error done  ',error)
      return res.status(500).json({'error':true});
      
     }


}

exports.findOne=async(req,res)=>{
    let id=req.params.id;
   try{
       const result=await userModel.findById({_id:id},{password:0,isAdmin:0,_id:0})
        if(!result)
            return res.status(204).json({'user':result});
        else
            return res.status(200).json({'user':result});
  
      }
   catch(error)
     {
        return res.status(500).json({'error':true});
     }
     
    
}
exports.updateUserById=async(req,res)=>{

    // let id=req.params.id;
    console.log("update user by id",req.body);

   try{
        const result=await userModel.findById({_id:req.body._id},{password:0,isAdmin:0})
        if(!result)
          return  res.status(200).json({'updated':false})
        else
         {
            result.fname=req.body.fname;
            result.lname=req.body.lname;
            // result.gender=req.body.gender;
            result.mobile_no=req.body.mobile_no;
            result.email=req.body.email;
        
            const result1=await result.save();
            if(!result1)
              return res.status(200).json({'updated':false})
            else 
              return res.status(200).json({'updated':true});
            
        }
      }
   catch(error)
     {
        console.log(error);
        return res.status(400).json({'updated':false});
     }
    
}

exports.deleteUserById=async(req,res)=>{
    
    try{
        const result=await userModel.findByIdAndRemove({_id:req.params.id});
         if(!result)
           return res.status(200).json({'deleted':false})
         else 
           return res.status(200).json({'deleted':true});
      
      }
    catch(error)
    {
        console.log("error in deleteUserById");
        return res.status(400).json({'deleted':false});
    }
    
}


exports.login=async(req,res,next)=>{
    const {email,password}=req.body;
  
    userModel.findOne({email},(err,user)=>{
        if(err) return next(err);
        
        if(!user){
            return res.status(200).json({'loggedIn':false});
        }else
        {
               user.checkPassword(password,(err,result)=>{
                if(err) return next(err);
                if(!result)
                {
                    console.log("Invalid Password");
                    res.status(200).json({'loggedIn':false});
                }else
                {
                       let token=user.createToken();

                        res.json({token,'loggedIn':true,isAdmin:user.isAdmin});
                      // res.json({token,user});   
                    //res.send('Login Successfully');
                }
            })
        }
    })
}



exports.findByEmail=async(req,res)=>{
    let id=req.params.id;
   try{
       const result=await userModel.findOne({email:req.user.email},{password:0,isAdmin:0,_id:0})
        if(!result)
            return res.status(204).json({'user':result});
        else
            return res.status(200).json({'user':result});
  
      }
   catch(error)
     {
        console.error(error);
        return res.status(500).json({'error':true});
     }
     
    
}