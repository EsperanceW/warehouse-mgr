const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils');

const Warehouse = mongoose.model('Warehouse');

const router = new Router({
    prefix: '/warehouse',
});

router.post('/add', async (ctx) => {
    const {
        newId,
        name,
        principal,
        contact,
        address,
        totalCapacity,
    } = getBody(ctx);

    let surplusCapacity = totalCapacity;

    const newIdOne = await Warehouse.findOne({
        newId: newId,
    }).exec();

    if (newIdOne) {
        ctx.body = {
            code: 0,
            msg: '仓库编号已存在',
        };

        return;
    };

    const warehouse = new Warehouse({
        newId,
        name,
        principal,
        contact,
        address,
        totalCapacity,
        surplusCapacity,
    });

    const res = await warehouse.save();

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

    const list = await Warehouse
        .find(query)
        .sort({
            newId: -1,
        })
        .skip((page - 1) * size)
        .limit(size)
        .exec();

    const total = await Warehouse.countDocuments();

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
    const list = await Warehouse.find().sort({
        newId: -1,
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

    const delJudge = await Warehouse.findOne({
        _id: id,
    });

    if (delJudge.surplusCapacity < delJudge.totalCapacity) {
        ctx.body = {
            msg: '该仓库中存有商品，无法删除',
            code: 0,
        };

        return;
    };

    const delMsg = await Warehouse.deleteOne({
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
        totalCapacity,
    } = ctx.request.body;

    const one = await Warehouse.findOne({
        _id: id,
    }).exec();

    // 没有找到供应商
    if (!one) {
        ctx.body = {
            msg: '没有找到供应商',
            code: 0,
        };

        return;
    };

    // 找到了供应商
    one.surplusCapacity = one.surplusCapacity + (totalCapacity - one.totalCapacity);

    const newQuery = {};
    
    Object.entries({
        name,
        principal,
        contact,
        address,
        totalCapacity,
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