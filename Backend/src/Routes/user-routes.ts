import { Router } from "express";   
import { getAllUsers, userLogin, userSignUp } from "../Controllers/user-controllers.js";
import { loginValidator, signUpValidator, validate } from "../utils/validators.js";


const userRoutes = Router();
// Route to get all users
userRoutes.get("/", getAllUsers);

// Route for sign-up of new user
userRoutes.post("/signup", validate(signUpValidator), userSignUp);

// Route for login of existing user
userRoutes.post("/login", validate(loginValidator), userLogin);

export default userRoutes;