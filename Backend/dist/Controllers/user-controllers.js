import User from "../Models/User.js";
import { hash, compare } from 'bcrypt';
export const getAllUsers = async (req, res, next) => {
    // Get all users from the database
    try {
        const users = await User.find();
        return res.status(200).json({ message: "Okay", users });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const userSignUp = async (req, res, next) => {
    // User SignUp
    try {
        // Getting details from the user
        const { name, email, password } = req.body;
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
        return res.status(201).json({ message: "Okay", id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const userLogin = async (req, res, next) => {
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
        //return res.status(201).json({ message:"Okay", id:user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=user-controllers.js.map