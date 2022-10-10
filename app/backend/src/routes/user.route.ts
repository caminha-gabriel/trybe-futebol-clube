import { Router } from 'express';
import validateLoginInfo from '../middlewares/validateLoginInfo';
import UserController from '../controllers/user.controller';
import validateAuth from '../middlewares/validateAuth';

const userRoute = Router();

const userController = new UserController();

userRoute.post('/login', validateLoginInfo, userController.login);
userRoute.get('/login/validate', validateAuth, userController.validateRole);

export default userRoute;