import {errorHandle} from './errorHandle.js';
import jwt from 'jsonwebtoken';

export const verifyUser = (req, res, next) => {
    console.log(req.cookies.token);
    const token = req.cookies.token;

    if(!token){
       return next(errorHandle(401, 'Unauthorized'));
    }
    else  {
        jwt.verify(token, process.env.SECRET, (err, user) => {
            if(err){
                req.user = user;
                console.log(user);
                return next(errorHandle(401, 'Unauthorized'));
            }
            else{
                req.user = user;
                console.log(user);
                next();
            }
        })
    }
}