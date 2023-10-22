import { Router } from "express";
import { getAllUsers } from "../Controllers/user-controllers.js";
const userRoutes = Router();
userRoutes.get("/", getAllUsers);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map