import { expressjwt, ExpressJwtRequest } from "express-jwt";
import * as fs from "fs";
import * as path from 'path';

export const jwt = () => {
    const secret = "tuanpham";
    var publicKey = fs.readFileSync(path.join(__dirname, './../../../../public.key'),'utf8');
    return expressjwt({ secret: publicKey, algorithms: ['RS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/v1/users/login',
            '/api/v1/users/register'
        ]
    });
}
