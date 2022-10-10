import { Router } from "express";
import validateLoginInfo from "../middlewares/validateLoginInfo";
import UserController from '../controllers/user.controller';

const userRoute = Router();

const userController = new UserController();

userRoute.post('/login', validateLoginInfo, userController.login);
userRoute.get('/login/validate', userController.validateAuth);

export default userRoute;