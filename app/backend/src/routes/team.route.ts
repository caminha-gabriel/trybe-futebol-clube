import { Router } from "express";
import TeamController from '../controllers/team.controller';

const teamRoute = Router();

const teamController = new TeamController();

teamRoute.get('/teams', teamController.getAll);
teamRoute.get('/teams/:id', teamController.findById);

export default teamRoute;