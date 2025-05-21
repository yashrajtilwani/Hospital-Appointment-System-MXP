import User from '../model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function userSignup(req, res){
    //deconstructing the data from the request body
    const {username, password, type} = req.body;

    //checking if the data is present or not
    if(!username || !password || !type){
        return res.json({
            success: false,
            message: "Please provide all the fields"
        })
    }

    //checking if the user already exists or not
    const existUser = await User.findOne({username});
    if(existUser){
        return res.json({
            success: false,
            message: "User already exists"
        })
    }
    
    
    const newUser = new User({
        username,
        password,
        type
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save();

    //generating token
    const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: "1d"});

    //setting the cookie with the token
    res.cookie('token', token, {
        httpOnly: false,
        maxAge: 24 * 60 * 60 * 1000
    }).json({success: true, message: 'Logged in successfully' });
}

//login User 
async function userLogin(req, res){
    let { username , password} = req.body;

    if(!username || !password){
        return res.json({success: false, message: "Please provide all the fields"});
    }

    const user = await User.findOne({username});

    if(!user){
        return res.json({success: false, message: "User does not exist"});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.json({success:false, message: "Invalid credentials"});
    }

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});

    res.cookie('token', token, {
        httpOnly: false,
        maxAge: 24 * 60 * 60 * 1000
    }).json({success: true, message: 'Logged in successfully' });
}

//Logout User
async function userLogout(req, res){
    res.cookie('token', null, {
        httpOnly: false,
        maxAge: 0
    });
    res.json({success: true, message: 'Logged out successfully' });
}

async function getUser(req, res){
    const users = await User.find({});
    if(!users){
        return res.json({success: false, message: "No users found"});
    }
    res.json({success: true, users});
}


export {userSignup, userLogin, userLogout, getUser};