const mongoose=require('mongoose');


module.exports = {

  connectToServer: function(dbName) {
    mongoose.connect(process.env.DB_URL+dbName,{useNewUrlParser:true,useUnifiedTopology:true}).then
    ((res)=>console.log("DB Connection Done"))
    .catch((err)=>console.log(err));
    
  }

};
