const express = require('express');
const router = express.Router();

//Login page
router.get('/login',(req,res)=>res.render('Login'));

//Register
router.get('/register',(req,res)=>res.render('register'));

//Registration Handling
router.post('/register',(req,res) =>{
    const { name, email, password, password2 } = req.body;
    let errors = [];
    console.log(password,typeof password,name,typeof name);
    //Check required fields
    if(!name || !email ||!password  || !password2){
        errors.push({msg:'Please fill required fields'});
    }
    
    //check if passwords equal
    if(password !== password2){
        errors.push({msg:'Passwords do not match'});
    }

    //check password length
    if(password.length<6){
        errors.push({msg:'Password should be atleast 6 characters'});
    }

    if(errors.length>0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        });
    }else{
        res.send('pass');
    }
});

module.exports = router