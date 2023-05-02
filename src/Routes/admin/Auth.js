const express=require('express');
const router=express.Router();
const {signup,signin,signout}=require('../../Controllers/Admin/Auth');
const { requireSignin } = require('../../Middleware/common');


router.post('/admin/signin',signin)
router.post('/admin/signup',signup)
router.post('/admin/signout',requireSignin,signout)



module.exports =router;