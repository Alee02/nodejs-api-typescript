import * as express from 'express';
class HealthCheckController {
    constructor() {
        this.path = "/";
        this.router = express.Router();
        this.displayHealth = (request, response, next) => {
            const getAuthenticationStatus = () => {
                if (request.header("Authorization")) {
                    return "Authenticated";
                }
                else {
                    return "Unauthenticated";
                }
            };
            console.log(getAuthenticationStatus());
            response.send({
                status: "Active",
                authenticationStatus: getAuthenticationStatus()
            });
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.displayHealth);
    }
}
export default HealthCheckController;
//# sourceMappingURL=healthcheck.controller.js.map