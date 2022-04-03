const mongoose = require('mongoose');

// 给哪个数据库
// 哪个集合
// 添加什么格式的文档

// Schema 映射了MongoDB下的一个集合，并且它的内容就是集合下文档的构成
// Model 根据Schema生成的一套方法，这套方法用来操作MongoDB下的集合和集合下的文档

// const UserSchema = new mongoose.Schema({
//     name:String,
//     password:String,
//     age:Number,
// });

// const UserModel = mongoose.model('User',UserSchema);

const connect = () => {
    // 去连接数据库
    mongoose.connect('mongodb://127.0.0.1:27017/warehouse-mgr');

    // 当数据库被打开的时候 做一些事情
    mongoose.connection.on('open', () => {
        console.log('连接成功');

        // 创建文档
        // const user = new UserModel({
        //     name: '张三',
        //     password: '123456',
        //     age: 23,
        // });

        //保存，同步到MongoDB
        // user.save();
    });
};

connect();