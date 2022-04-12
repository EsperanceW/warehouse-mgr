const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils');

const GOODS_CONST = {
    IN: 'IN_COUNT',
    OUT: 'OUT_COUNT',
};

const Goods = mongoose.model('Goods');

const router = new Router({
    prefix: '/goods',
});

router.post('/add', async (ctx) => {
    const {
        name,
        price,
        supplier,
        launchDate,
        classify,
        count,
    } = getBody(ctx);

    const goods = new Goods({
        name,
        price,
        supplier,
        launchDate,
        classify,
        count,
    });

    const res = await goods.save();

    ctx.body = {
        data: res,
        code: 1,
        msg: '添加成功',
    };
});

router.get('/list', async (ctx) => {
    // https://aa.cc.com/user?page=2&size=20&keyword=商品名#fdsafds
    const {
        page = 1,
        keyword = ''
    } = ctx.query;

    let = {
        size = 10,
    } = ctx.query;

    size = Number(size);

    const query = {};

    if (keyword) {
        query.name = keyword;
    };

    const list = await Goods
        .find(query)
        .skip((page - 1) * size)
        .limit(size)
        .exec();
    
    const total = await Goods.countDocuments();

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

router.delete('/:id', async (ctx) => {
    const {
        id
    } = ctx.params;

    const delMsg = await Goods.deleteOne({
        _id: id,
    });

    ctx.body = {
        data:delMsg,
        msg: '删除成功',
        code: 1,
    };
});

router.post('/update/count', async (ctx) => {
    const {
        id,
        type,
    } = ctx.request.body;

    let {
        num,
    } = ctx.request.body;

    num = Number(num);

    const goods = await Goods.findOne({
        _id: id,
    }).exec();

    if (!goods) {
        ctx.body = {
            code: 0,
            msg: '没有找到商品',
        };

        return;
    };

    // 找到了商品
    if (type === GOODS_CONST.IN) {
        // 入库操作
        num = Math.abs(num);
    } else {
        // 出库操作
        num = - Math.abs(num);
    };

    goods.count = goods.count + num;

    if (goods.count < 0) {
        ctx.body = {
            code: 0,
            msg: '剩下的量不足以出库',
        }

        return;
    };

    const res = await goods.save();

    ctx.body = {
        data: res,
        code: 1,
        msg: '操作成功',
    }
});

router.post('/update', async (ctx) => {
    const {
        id,
        ...others
    } = ctx.request.body;

    const one = await Goods.findOne({
        _id: id,
    }).exec();

    // 没有找到商品
    if (!one) {
        ctx.body = {
            code: 0,
            msg: '没有找到商品',
        }
        return;
    };

    // 找到了商品
    const newQuery = {};

    Object.entries(others).forEach(([key, value]) => {
        if (value) {
            newQuery[key] = value;
        }
    });

    Object.assign(one, newQuery);

    const res = await one.save();

    ctx.body = {
        data: res,
        code: 1,
        msg: '保存成功',
    }
});

module.exports = router;