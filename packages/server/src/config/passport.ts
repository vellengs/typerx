import * as passport from "passport";
import * as passportLocal from "passport-local";
import * as _ from "lodash";

import { Request, Response, NextFunction } from "express";
import { CoreDatabase as Db } from './../modules/core/core.database';
import { Repository } from "../database/repository";

const LocalStrategy = passportLocal.Strategy;

export function initPassport() {

    passport.serializeUser<any, any>((user, done) => {
        if (user) {
            done(undefined, user.id);
        } else {
            done({ message: 'User not found.' });
        }
    });

    passport.deserializeUser((id, done) => {
        Db.Account.findById(id).populate('profile').exec((err, user) => {
            const instance = Repository.mergeProfile(user);
            done(err, instance);
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
