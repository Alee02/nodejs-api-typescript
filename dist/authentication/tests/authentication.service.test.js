import UserWithThatEmailAlreadyExistsException from '../../exceptions/UserWithThatEmailAlreadyExistsException';
import AuthenticationService from '../authentication.service';
describe('The AuthenticationService', () => {
    describe('when creating a cookie', () => {
        it('should return a string', () => {
            const tokenData = {
                token: '',
                expiresIn: 1,
            };
            const authenticationService = new AuthenticationService();
            expect(typeof authenticationService.createCookie(tokenData))
                .toEqual('string');
        });
    });
    describe('when registering a user', () => {
        describe('if the email is already taken', () => {
            it('should throw an error', async () => {
                const userData = {
                    name: 'John Smith',
                    email: 'john@smith.com',
                    password: 'strongPassword123',
                };
                const authenticationService = new AuthenticationService();
                authenticationService.user.findOne = jest.fn().mockReturnValue(Promise.resolve(userData));
                await expect(authenticationService.register(userData))
                    .rejects.toMatchObject(new UserWithThatEmailAlreadyExistsException(userData.email));
            });
        });
        describe('if the email is not taken', () => {
            it('should not throw an error', async () => {
                const userData = {
                    name: 'John Smith',
                    email: 'john@smith.com',
                    password: 'strongPassword123',
                };
                process.env.JWT_SECRET = 'jwt_secret';
                const authenticationService = new AuthenticationService();
                authenticationService.user.findOne = jest.fn().mockReturnValue(Promise.resolve(undefined));
                authenticationService.user.create = jest.fn().mockReturnValue(Object.assign({}, userData, { _id: 0 }));
                await expect(authenticationService.register(userData))
                    .resolves.toBeDefined();
            });
        });
    });
});
//# sourceMappingURL=authentication.service.test.js.map