import { Request } from 'express';
import { Errors } from 'typescript-rest';

export function validator(req: Request): Request {
    console.log('do validate ...');

    if (req.body.userId != undefined) {
        throw new Errors.BadRequestError("userId not present");
    } else {
        //  req.body.user = Users.get(req.body.userId)
        return req
    }
}