import * as express from 'express';
import NotAuthorizedException from '../exceptions/NotAuthorizedException';
import authMiddleware from '../middleware/auth.middleware';
import postModel from '../post/post.model';
class UserController {
    constructor() {
        this.path = '/users';
        this.router = express.Router();
        this.post = postModel;
        this.getAllPostsOfUser = async (request, response, next) => {
            const userId = request.params.id;
            if (userId === request.user._id.toString()) {
                const posts = await this.post.find({ author: userId });
                response.send(posts);
            }
            next(new NotAuthorizedException());
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/:id/posts`, authMiddleware, this.getAllPostsOfUser);
    }
}
export default UserController;
//# sourceMappingURL=user.controller.js.map