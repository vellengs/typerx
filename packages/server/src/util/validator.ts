import { Request } from 'express';
import { Errors } from 'typescript-rest';

export function validator(req: Request): Request {
    if (req.body.userId != undefined) {
        throw new Errors.BadRequestError("userId not present");
    } else {
        return req
    }
}