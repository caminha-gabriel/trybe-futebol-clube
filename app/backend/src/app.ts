import * as express from 'express';
import errorMiddleware from './middlewares/errorMiddleware';
import routes from './routes';
class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.createRoutes();
  }
  
  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };
    
    this.app.use(express.json());
    this.app.use(accessControl);
  }
  
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
  
  private createRoutes(): void {
    this.app.use(routes.userRoute);
    this.app.use(routes.teamRoute);
    this.app.use(routes.matchRoute);
    this.app.use(routes.leaderboardRoute);
    this.app.use(errorMiddleware);
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
