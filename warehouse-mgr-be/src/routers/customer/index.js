const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils');

const Customer = mongoose.model('Customer');

const router = new Router({
    prefix: '/customer',
});

router.post('/add', async (ctx) => {
    const {
        newId,
        name,
        principal,
        contact,
        address,
    } = getBody(ctx);

    const newIdOne = await Customer.findOne({
        newId: newId,
    }).exec();

    if (newIdOne) {
        ctx.body = {
            code: 0,
            msg: '客户编号已存在',
        };

        return;
    };

    const customer = new Customer({
        newId,
        name,
        principal,
        contact,
        address,
    });

    const res = await customer.save();

    ctx.body = {
        data: res,
        code: 1,
        msg: '添加成功',
    };
});

router.get('/list', async (ctx) => {
    const {
        page = 1,
        keyword = '',
    } = ctx.query;

    let {
        size = 10,
    } = ctx.query;

    size = Number(size);

    const query = {};

    // 防止 keyword 为空时也进行搜索查询
    if (keyword) {
        query.name = keyword;
    };

    const list = await Customer
        .find(query)
        .sort({
            newId: -1,
        })
        .skip((page - 1) * size)
        .limit(size)
        .exec();

    const total = await Customer.countDocuments();

    ctx.body = {
        data: {
            total,
            list,
            page,
            size,
        },
        code: 1,
        msg: '获取列表成功',
    };
});

router.get('/list/all', async (ctx) => {
    const list = await Customer.find().sort({
        _id: -1,
    }).exec();

    ctx.body = {
        data: list,
        code: 1,
        msg: '获取成功',
    };
});

router.delete('/:id', async (ctx) => {
    const {
        id,
    } = ctx.params;

    const delMsg = await Customer.deleteOne({
        _id: id,
    });

    ctx.body = {
        data: delMsg,
        msg: '删除成功',
        code: 1,
    };
});

router.post('/update', async (ctx) => {
    const {
        id,
        name,
        principal,
        contact,
        address,
    } = ctx.request.body;

    const one = await Customer.findOne({
        _id: id,
    }).exec();

    // 没有找到客户
    if (!one) {
        ctx.body = {
            msg: '没有找到客户',
            code: 0,
        };

        return;
    };

    // 找到了客户
    const newQuery = {};
    
    Object.entries({
        name,
        principal,
        contact,
        address,
    }).forEach(([key, value]) => {
        if (value) {
            newQuery[key] = value;
        };
    });

    Object.assign(one, newQuery);

    const res = await one.save();

    ctx.body = {
        data: res,
        code: 1,
        msg: '保存成功',
    };
});

module.exports = router;