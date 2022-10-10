import { Router } from "express";
import TeamController from '../controllers/team.controller';

const teamRoute = Router();

const teamController = new TeamController();

teamRoute.get('/teams', teamController.getAll);

export default teamRoute;