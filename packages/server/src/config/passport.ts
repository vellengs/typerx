import * as passport from "passport";
import * as passportLocal from "passport-local";
import * as _ from "lodash";

import { Request, Response, NextFunction } from "express";
import { CoreDatabase as Db } from './../modules/core/core.database';

const LocalStrategy = passportLocal.Strategy;

export function init() {

    passport.serializeUser<any, any>((user, done) => {
        if (user) {
            done(undefined, user.id);
        } else {
            done({ message: 'User not found.' });
        }
    });

    passport.deserializeUser((id, done) => {
        Db.Account.findById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy({ usernameField: "username" }, (username, password, done) => {
        Db.Account.findOne({
            username: username.toLowerCase(),
            isApproved: true,
        }, (err, user: any) => {

            if (err) { return done(err); }

            const errorMessage = `用户 ${username} 不存在, 或者密码错误！`;

            if (!user || user.isDisable) {
                return done(undefined, false, { message: errorMessage });
            }

            if (user.expired && user.expired < new Date()) {
                return done(undefined, false, { message: errorMessage });
            }

            user.comparePassword(password, (err: Error, isMatch: boolean) => {
                if (err) { return done(err); }
                if (isMatch) {
                    return done(undefined, user);
                }
                return done(undefined, false, { message: errorMessage });
            });
        });
    }));
}


/**
 * Login Required middleware.
 */
export let isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
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

/**
 * Authorization Required middleware.
 */
export let isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    const provider = req.path.split("/").slice(-1)[0];

    if (_.find(req.user.tokens, { kind: provider })) {
        next();
    } else {
        res.redirect(`/auth/${provider}`);
    }
};
