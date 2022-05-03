// 每个文件都是一个模块
const Koa = require('koa');
const koaBody = require('koa-body');
const Body = require('koa-body');
const { connect } = require('./db');
const registerRoutes = require('./routers');
const { middleware: koaJwtMiddleware, checkUser,catchTokenError } = require('./helpers/token');
const { logMiddleware } = require('./helpers/log')
const cors = require('@koa/cors');

const app = new Koa();

connect().then(() => {
    app.use(cors());
    app.use(koaBody());

    app.use(catchTokenError);

    koaJwtMiddleware(app);

    app.use(checkUser);

    app.use(logMiddleware);

    registerRoutes(app);

    // 开启一个http服务
    // 接受http请求并做处理，处理完后响应
    app.listen(3000, () => {
        console.log('启动成功');
    });
});
