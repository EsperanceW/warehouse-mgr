// 每个文件都是一个模块
const koa = require('Koa');

// const getYearByTimeStamp =  require('./helpers/utils/index');

// console.log(getYearByTimeStamp(new Date().getTime()));

const app = new koa();

// 通过app.use注册中间件
// 中间件本质上就是一个函数
// 每次请求进来中间件都会被执行一次
// context 上下文 - 当前请求的相关信息都在里面
// app.use((context) => {
//     // console.log(123);
//     const { request: req } = context; // 对象的解构
//     const { url } = req;

//     if (url === '/user') {
//         context.response.body = 'abcde';

//         return;
//     }

//     context.body = '??';
// });

// 开启一个http服务
// 接受http请求并做处理，处理完后响应
app.listen(3000, () => {
    console.log('启动成功');
});
