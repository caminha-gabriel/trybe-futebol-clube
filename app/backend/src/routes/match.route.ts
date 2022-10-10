import { Router } from 'express';
import validateAuth from '../middlewares/validateAuth';
import MatchController from '../controllers/match.controller';

const matchRoute = Router();

const matchController = new MatchController();

matchRoute.get('/matches', matchController.getAll);
matchRoute.post('/matches', validateAuth, matchController.saveMatch);

export default matchRoute;