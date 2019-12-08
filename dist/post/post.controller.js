import * as express from 'express';
import PostNotFoundException from '../exceptions/PostNotFoundException';
import authMiddleware from '../middleware/auth.middleware';
import validationMiddleware from '../middleware/validation.middleware';
import CreatePostDto from './post.dto';
import postModel from './post.model';
class PostController {
    constructor() {
        this.path = '/posts';
        this.router = express.Router();
        this.post = postModel;
        this.getAllPosts = async (request, response) => {
            const posts = await this.post.find()
                .populate('author', '-password');
            response.send(posts);
        };
        this.getPostById = async (request, response, next) => {
            const id = request.params.id;
            const post = await this.post.findById(id);
            if (post) {
                response.send(post);
            }
            else {
                next(new PostNotFoundException(id));
            }
        };
        this.modifyPost = async (request, response, next) => {
            const id = request.params.id;
            const postData = request.body;
            const post = await this.post.findByIdAndUpdate(id, postData, { new: true });
            if (post) {
                response.send(post);
            }
            else {
                next(new PostNotFoundException(id));
            }
        };
        this.createPost = async (request, response) => {
            const postData = request.body;
            const createdPost = new this.post(Object.assign({}, postData, { author: request.user._id }));
            const savedPost = await createdPost.save();
            await savedPost.populate('author', '-password').execPopulate();
            response.send(savedPost);
        };
        this.deletePost = async (request, response, next) => {
            const id = request.params.id;
            const successResponse = await this.post.findByIdAndDelete(id);
            if (successResponse) {
                response.send(200);
            }
            else {
                next(new PostNotFoundException(id));
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, this.getAllPosts);
        this.router.get(`${this.path}/:id`, this.getPostById);
        this.router
            .all(`${this.path}/*`, authMiddleware)
            .patch(`${this.path}/:id`, validationMiddleware(CreatePostDto, true), this.modifyPost)
            .delete(`${this.path}/:id`, this.deletePost)
            .post(this.path, authMiddleware, validationMiddleware(CreatePostDto), this.createPost);
    }
}
export default PostController;
//# sourceMappingURL=post.controller.js.map