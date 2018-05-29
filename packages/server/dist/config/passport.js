"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const passportLocal = require("passport-local");
const _ = require("lodash");
const core_database_1 = require("./../modules/core/core.database");
const repository_1 = require("../database/repository");
const LocalStrategy = passportLocal.Strategy;
function init() {
    passport.serializeUser((user, done) => {
        if (user) {
            done(undefined, user.id);
        }
        else {
            done({ message: 'User not found.' });
        }
    });
    passport.deserializeUser((id, done) => {
        core_database_1.CoreDatabase.Account.findById(id).populate('profile').exec((err, user) => {
            const instance = repository_1.Repository.mergeProfile(user);
            done(err, instance);
        });
    });
    passport.use(new LocalStrategy({ usernameField: "username" }, (username, password, done) => {
        core_database_1.CoreDatabase.Account.findOne({
            username: username.toLowerCase(),
            isApproved: true,
        }, (err, user) => {
            if (err) {
                return done(err);
            }
            const errorMessage = `用户 ${username} 不存在, 或者密码错误！`;
            if (!user || user.isDisable) {
                return done(undefined, false, { message: errorMessage });
            }
            if (user.expired && user.expired < new Date()) {
                return done(undefined, false, { message: errorMessage });
            }
            user.comparePassword(password, (err, isMatch) => {
                if (err) {
                    return done(err);
                }
                if (isMatch) {
                    return done(undefined, user);
                }
                return done(undefined, false, { message: errorMessage });
            });
        });
    }));
}
exports.init = init;
/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
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
exports.isAuthorized = (req, res, next) => {
    const provider = req.path.split("/").slice(-1)[0];
    if (_.find(req.user.tokens, { kind: provider })) {
        next();
    }
    else {
        res.redirect(`/auth/${provider}`);
    }
};
//# sourceMappingURL=passport.js.map