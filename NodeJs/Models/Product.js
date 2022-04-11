const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const productSchema=new Schema({
    pname:{type:String,required:true},
    desc:{type:String,required:true},
    price:{type:Number,required:true},
    ptype:{type:String,required:true},
    img:{type:String,required:true},
    isDeleted:{type:Boolean,default:false}

})


const Product=mongoose.model('Product',productSchema);
module.exports=Product;