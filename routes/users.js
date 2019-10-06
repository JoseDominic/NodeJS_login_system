const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

//Login page
router.get('/login',(req,res)=>res.render('Login'));

//Register
router.get('/register',(req,res)=>res.render('register'));

//Registration Handling
router.post('/register',(req,res) =>{
    const { name, email, password, password2 } = req.body;
    let errors = [];
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
        //Validation passed

        //check if email already exists
        User.findOne({email:email})
            .then(user => {
            if(user){
                errors.push({msg:'Email already registered'});
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2,
                });
            }
            else{
                const newUser = new User({
                    name,
                    email,
                    password,
                });
                
                //Hash password
                bcrypt.genSalt(10,(err,salt) => {
                    if(err) throw err;
                    bcrypt.hash(newUser.password,salt,(err,hash) => {
                        if(err) throw err;
                        //set password to hash
                        newUser.password = hash
                        //save user
                        newUser.save()
                            .then( user => {
                                res.redirect('/users/login');
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    });
                });
            }

            });
        
    }
});

module.exports = router