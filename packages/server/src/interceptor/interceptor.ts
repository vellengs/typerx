import { Request, Response, NextFunction } from 'express';
import { Errors } from 'typescript-rest';
import { LogService } from '../modules/core/log.service';
import { CoreDatabase as Db } from './../modules/core/core.database';

export async function interceptor(req: Request) {
    return req;
}

export async function operationLog(req: Request) {
    if (req.user && req.method !== 'GET') {
        const user: any = req.user;
        const desc = await getApiDescription(req.route.path, req.method);
        const ip: any = req.headers['x-real-ip'] || req.headers['x-forwarded-for'];
        await LogService.save({
            name: req.method,
            operator: user.username,
            operatorIp: ip || req.connection.remoteAddress,
            operation: req.method.toLowerCase() + req.originalUrl,
            comment: desc
        })
    }
}

async function getApiDescription(path: string, method: string) {

    const api = await Db.Api.findOne({
        path: path,
        method: method
    }).exec();

    const result = api || { description: '' };
    return result.description;
}