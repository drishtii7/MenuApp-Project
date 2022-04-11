let jwt=require('jsonwebtoken');

module.exports={


    isUserLoggedIn:async function(req,res,next){
        try{
            let token=req.headers.authorization;
            if(!token)
            {
                return res.status(400).json({'isLoggedIn':false});

            }else{
                next();
            }
            
        }
        catch(error){

            next(error)
            return res.status(400).json({'isLoggedIn':false});

        }
    },
    isLoggedIn:async function(req,res,next){
        try{
            let token=req.headers.authorization;
            if(!token)
            {
                return res.status(500).json({'isLoggedIn':false});
            }else{
                
                
            try{
               
            
                let profileData=await jwt.verify(token,process.env.private_key);
                console.log(profileData)
                req.user=profileData; // add data into request object
                console.log(req.user);
                next();
                
             }
             catch(tokenError)
             {
                 console.log("invalid token  error");
                return res.status(500).json({'isLoggedIn':false});

             }
            }
            
        }
        catch(error){
            console.error(" errro token ");
          //next(error)
            return res.status(500).json({'isLoggedIn':false});

        }
    },
    

      
}