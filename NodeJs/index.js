require('dotenv').config()

const express=require('express');
const mongodb=require('./DBUtil/DatabaseConfig');
const bodyParser=require('body-parser');
const cors=require('cors');
const path=require('path');

mongodb.connectToServer('CafeDB');


const app=express();

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/images',express.static(path.join(__dirname,'images')));


// configure all routes
const userRouter=require('./Routes/user.routes');
const productRouter=require('./Routes/product.routes');
app.use('/users',userRouter);
app.use('/product',productRouter);



app.listen(process.env.PORT,()=>{
  console.log('Server running on port number ',process.env.PORT);
})