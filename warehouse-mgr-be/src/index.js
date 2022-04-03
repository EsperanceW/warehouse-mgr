const koa = require('Koa');

const app = new koa();

app.listen(3000, () => {
    console.log('启动成功');
});


