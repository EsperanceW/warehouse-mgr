const jwt = require('jsonwebtoken');
const config = require('../../project.config');
const koaJwt = require('koa-jwt');
const mongoose = require('mongoose');

const User = mongoose.model('User');

const getToken = (ctx) => {
    let { authorization } = ctx.header;

    return authorization.replace(/Bearer\s/i, '');
};

const verify = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.JWT_SECRET, (err, payload) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(payload);
        });
    });
};

// 注册一个中间件 判断 token 能否被正确解析 使 token 能够被成功解析出来
const middleware = (app) => {
    app.use(koaJwt({
        secret: config.JWT_SECRET,
    }).unless({
        path: [
            /^\/auth\/login/,
            /^\/auth\/register/,
            /^\/forget-password\/add/
        ], // 登录 注册 忘记密码 这三个地方没有token 不需要进行解析
    }));
};

// 校验被解析出来的 token 所对应的用户是否存在 账户、角色等是否正确
const res401 = (ctx) => {
    ctx.status = 401;
    ctx.body = {
        code: 0,
        msg: '用户校验失败',
    };
};

const checkUser = async (ctx, next) => {
    const { path } = ctx;

    if (path === '/auth/login' || path === '/auth/register' || path === '/forget-password/add') {
        await next();

        return;
    }; // 登录 注册 忘记密码 这三个地方没有token 不需要进行校验

    const { _id, account, character } = await verify(getToken(ctx));

    const user = await User.findOne({
        _id,
    }).exec();

    if (!user) {
        res401(ctx);

        return;
    };

    if (account !== user.account) {
        res401(ctx);

        return;
    };

    if (character !== user.character) {
        res401(ctx);

        return;
    };

    await next();
};

const catchTokenError = async (ctx, next) => {
    return next().catch((error) => {
        if (error.status === 401) {
            ctx.status = 401;

            ctx.body = {
                code: 0,
                msg: 'token error',
            };
        } else {
            throw error;
        }
    });
};

module.exports = {
    verify,
    getToken,
    middleware,
    catchTokenError,
    checkUser,
};