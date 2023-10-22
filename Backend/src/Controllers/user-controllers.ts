import { NextFunction, Request, Response } from "express";
import User from "../Models/User.js";
import { hash, compare } from 'bcrypt';
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (req:Request, res:Response, next:NextFunction) => {
    // Get all users from the database
    try {
        const users = await User.find();
        return res.status(200).json({ message:"Okay", users });

    } catch (error) {
        console.log(error);
        return res.status(200).json({ message:"ERROR", cause:error.message });
    }
};

export const userSignUp = async (req:Request, res:Response, next:NextFunction) => {
    // User SignUp
    try {
        // Getting details from the user
        const {name, email, password} = req.body;

        // Checking if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).send("User already registered");
        }

        // Encrypting password before storing it in database 
        const hashedPassword = await hash(password, 10);

        // Saving user details into the database
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        // Removing previous cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });

        // Generating JWT Token upon Login
        const token = createToken(user._id.toString(), user.email, "7d");

        // Sending cookie to the user
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, { 
            path: "/",
            domain: "localhost",
            httpOnly: true,
            expires,
            signed: true, 
        });

        return res.status(201).json({ message:"Okay", id:user._id.toString() });

    } catch (error) {
        console.log(error);
        return res.status(200).json({ message:"ERROR", cause:error.message });
    }
};


export const userLogin = async (req:Request, res:Response, next:NextFunction) => {
    // User SignUp
    try {
        // Getting details from the user
        const { email, password } = req.body;

        // Finding user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User not registered");
        }

        // Authentication
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password");
        }

        // Removing previous cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });

        // Generating JWT Token upon Login
        const token = createToken(user._id.toString(), user.email, "7d");

        // Sending cookie to the user
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, { 
            path: "/",
            domain: "localhost",
            httpOnly: true,
            expires,
            signed: true, 
        });

        return res.status(201).json({ message:"Okay", id:user._id.toString() });

    } catch (error) {
        console.log(error);
        return res.status(200).json({ message:"ERROR", cause:error.message });
    }
};