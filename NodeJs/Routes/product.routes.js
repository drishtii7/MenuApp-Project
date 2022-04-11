const express=require('express');
const router=express.Router();
const auth=require('../Middlewares/auth');
const productController=require('../Controllers/product.controller');
const {upload}=require('../Controllers/fileUploadHelper');


router.post('/add',auth.isLoggedIn,upload.single('file'),productController.insertProduct);
router.get('/items/:ptype',auth.isLoggedIn,productController.findPizzaByType);
router.delete('/delete/:id',auth.isLoggedIn,productController.deleteProductById);
router.put('/update',auth.isLoggedIn,upload.single('file'),productController.updateProduct);

// router.post('/singleFile',upload.single('file'),productController.singleFileUpload);


module.exports=router;