import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
import * as mongoose from 'mongoose';
import errorMiddleware from './middleware/error.middleware';
class App {
    constructor(controllers) {
        this.app = express();
        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }
    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        });
    }
    getServer() {
        return this.app;
    }
    // @ts-ignore
    initializeMiddlewares() {
        // let checkJwt: any;
        // checkJwt = jwt({
        //     secret: jwksRsa.expressJwtSecret({
        //         cache: true,
        //         rateLimit: true,
        //         jwksRequestsPerMinute: 5,
        //         jwksUri: 'https://YOUR_DOMAIN/.well-known/jwks.json',
        //       }),
        //
        //                        // Validate the audience and the issuer.
        //     audience: 'YOUR_API_IDENTIFIER',
        //     issuer: 'https://YOUR_DOMAIN/',
        //     algorithms: ['RS256'],
        //   });
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        // this.app.use(jwt({
        //                      // Dynamically provide a signing key
        //                      // based on the kid in the header and
        //                      // the signing keys provided by the JWKS endpoint.
        //                      secret: jwksRsa.expressJwtSecret({
        //                                                           cache: true,
        //                                                           rateLimit: true,
        //                                                           jwksRequestsPerMinute: 5,
        //                                                           jwksUri: `https://ashah-dev.eu.auth0.com/.well-known/jwks.json`
        //                                                       }),
        //
        //                      // Validate the audience and the issuer.
        //                      audience: 'http://test/api',
        //                      issuer: `https://ashah-dev.eu.auth0.com/`,
        //                      algorithms: ['RS256']
        //                  }));
    }
    initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }
    connectToTheDatabase() {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH, } = process.env;
        mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_PATH}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
}
export default App;
//# sourceMappingURL=app.js.map