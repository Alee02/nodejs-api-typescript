import * as express from 'express';
import userModel from '../user/user.model';
class ReportController {
    constructor() {
        this.path = '/report';
        this.router = express.Router();
        this.user = userModel;
        this.generateReport = async (request, response, next) => {
            const usersByCountries = await this.user.aggregate([
                {
                    $match: {
                        'address.country': {
                            $exists: true,
                        },
                    },
                },
                {
                    $group: {
                        _id: {
                            country: '$address.country',
                        },
                        users: {
                            $push: {
                                _id: '$_id',
                                name: '$name',
                            },
                        },
                        count: {
                            $sum: 1,
                        },
                    },
                },
                {
                    $lookup: {
                        from: 'posts',
                        localField: 'users._id',
                        foreignField: 'author',
                        as: 'articles',
                    },
                },
                {
                    $addFields: {
                        amountOfArticles: {
                            $size: '$articles',
                        },
                    },
                },
                {
                    $sort: {
                        amountOfArticles: 1,
                    },
                },
            ]);
            response.send({
                usersByCountries,
            });
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.generateReport);
    }
}
export default ReportController;
//# sourceMappingURL=report.controller.js.map