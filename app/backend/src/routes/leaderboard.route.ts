import { Router } from "express";
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardRoute = Router();

const leaderboardController = new LeaderboardController();

leaderboardRoute.get('/leaderboard/home', leaderboardController.getAll);

export default leaderboardRoute;