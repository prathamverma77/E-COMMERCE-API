import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';



//REGISTER LOGIC
export const registerUser = async (req, res) => {
    try {
        const {name, email, password, role}= req.body;

        //checking if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:'Email already exists'});
        }

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        //send token
        const token = generateToken(newUser._id);

        res.status(201).json({
            success: true,
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
            token,
        });
    }catch(error) {
        console.error(error);
        res.status(500).json({message: 'server error'});
    }
};


//LOGIN LOGIC
export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        //check if email exists in DB
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message:'Invalid Credential'});
        }

        //compare plain password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:'Invalid Credentials'});
        }

        //Generate JWT token
        const token = generateToken(user._id);

        //send user data (excluding password)
        res.status(200).json({
            success: true,
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }catch (error){
        console.error(error);
        res.status(500).json({message:'server error'});
    }
};