import 'dotenv/config';
import App from './app';
import AuthenticationController from './authentication/authentication.controller';
import PostController from './post/post.controller';
import ReportController from './report/report.controller';
import UserController from './user/user.controller';
import HealthCheckController from './healthcheck.controller';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App(
  [
    new HealthCheckController(),
    new PostController(),
    new AuthenticationController(),
    new UserController(),
    new ReportController(),
  ],
);

app.listen();
