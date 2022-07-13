import { expressjwt, ExpressJwtRequest } from "express-jwt";

export const jwt = () => {
    const secret = "tuanpham";
    return expressjwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/v1/users/login',
            '/api/v1/users/register'
        ]
    });
}
