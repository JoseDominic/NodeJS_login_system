const express = require('express');
const router = express.Router();

//Login page
router.get('/login',(req,res)=>res.render('Login'));

//Register
router.get('/register',(req,res)=>res.render('register'));

//Registration Handling
router.post('/register',(req,res) =>{
    const {name , email , password1 ,password2} =req.body;
    // const name = req.body.name
    // const email = req.body.email
    // const password1 = req.body.password1
    // const password2 = req.body.password2 
    let errors = [];
    console.log(req.body);
    
    //Check required fields
    if(!name || !email ||!password1 || !password2){
        errors.push({msg:'Please fill required fields'});
    }
    
    //check if passwords equal
    if(password1 !== password2){
        errors.push({msg:'Passwords do not match'});
    }

    //check password length
    if(password1.length<6){
        errors.push({msg:'Password should be atleast 6 characters'});
    }

    if(errors.length>0){
        res.render('register',{
            errors,
            name,
            email,
            password1,
            password2
        });
    }else{
        res.send('pass');
    }
});

module.exports = router