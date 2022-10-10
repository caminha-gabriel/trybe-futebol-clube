import { Router } from "express";
import MatchController from '../controllers/match.controller';

const matchRoute = Router();

const matchController = new MatchController();

matchRoute.get('/matches', matchController.getAll);

export default matchRoute;