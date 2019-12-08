import Controller from './interfaces/controller.interface';
import * as express from 'express';

class HealthCheckController implements Controller {
    public path: string = "/";
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.displayHealth);
    }

    private displayHealth = (request: express.Request, response: express.Response, next: express.NextFunction) => {

        const getAuthenticationStatus = () => {
            if (request.header("Authorization")) {
                return "Authenticated";
            } else {
                return "Unauthenticated";
            }
        };
        console.log(getAuthenticationStatus());

        response.send(
            {
                status: "Active",
                authenticationStatus: getAuthenticationStatus()
            }
        );
    };

}

export default HealthCheckController;
