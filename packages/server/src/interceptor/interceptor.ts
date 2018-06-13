import { Request, Response, NextFunction } from 'express';
import { Errors } from 'typescript-rest';
 
export async function interceptor(req: Request) {
    console.log('req:', req.route);
    // if (req.body.userId != undefined) {
    //     throw new Errors.BadRequestError("userId not present");
    // } else {
    //     return req
    return req;
    // next();
}