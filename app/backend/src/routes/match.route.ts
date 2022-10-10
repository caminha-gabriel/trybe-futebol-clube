import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import validateAuth from '../middlewares/validateAuth';
import validateTeamsDistinction from '../middlewares/validateTeamsDistinction';

const matchRoute = Router();

const matchController = new MatchController();

matchRoute.get('/matches', matchController.getAll);
matchRoute.post('/matches', validateAuth, validateTeamsDistinction, matchController.saveMatch);

export default matchRoute;