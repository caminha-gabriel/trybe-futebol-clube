import { Router } from "express";
import UserController from '../controllers/user.controller';
import UserService from "../services/user.service";

const userRoute = Router();

const userService = new UserService();
const userController = new UserController(userService);

userRoute.post('/login', userController.login);

export default userRoute;