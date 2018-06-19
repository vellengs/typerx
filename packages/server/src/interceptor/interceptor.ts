import { Request, Response, NextFunction } from 'express';
import { Errors } from 'typescript-rest';
import { LogService } from '../modules/core/log.service';
import { CoreDatabase as Db } from './../modules/core/core.database';
import { AccessService } from '../modules/core/access.service';

export const apiPrefix = '/api';

const PublicRouters = [
    'setting'
];

function isPublicApi(req: Request) {  // need test 
    if (req.method === 'GET') {
        for (const router of PublicRouters) {
            if (req.url.startsWith(router)) {
                return true;
            }
        }
        return true;
    }
    return false;
}


export async function interceptor(req: Request) {
    return req;
}

export async function permissionCheck(req: Request) {

    if (req.user && !req.user.isAdmin &&
        req.route.path.startsWith(apiPrefix) &&
        !isPublicApi(req)
    ) {
        const result = await hasPermission(req.user.id, req.method.toLowerCase() + req.route.path);
        if (!result) {
            throw new Errors.ForbiddenError("no permission");
        }
    }

    return req;
}

async function hasPermission(accountId: string, route: string) {
    const path = this.normalizePath(route);
    const apis = (await getAccessibleApis(accountId)) || [];
    const exists = apis.findIndex((p) => {
        return p.path === path;
    });
    return exists > -1;
}

/**
 * 获取帐号能访问的所有api
 * 1. 获取角色
 * 2. 通过角色获取权限
 * 3. 通过权限后去能够访问的所有api
 * @param accountId 
 */
async function getAccessibleApis(accountId: string) {
    const account = await Db.Account.findOne({ _id: accountId }, 'roles').exec();
    const roles = account.roles || [];
    const roleDocs = await Db.Role.find({
        _id: { $in: roles }
    }, 'permissions').exec() || [];
    const permissions: string[] = [];

    roleDocs.forEach((g: any) => {
        permissions.push(...g.permissions);
    });

    const apis = await Db.Api.find({
        permissions: {
            $in: permissions
        }
    }, 'path');

    return apis;
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
        return req;
    }
    return req;
}


export async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return next();
    } else if (isPublicApi(req)) {
        return next();
    } else {
        res.status(401);
        res.send({
            error: {
                message: 'user is not authenticated'
            }
        });
    }
};

async function getApiDescription(path: string, method: string) {

    const api = await Db.Api.findOne({
        path: path,
        method: method
    }).exec();

    const result = api || { description: '' };
    return result.description;
}

