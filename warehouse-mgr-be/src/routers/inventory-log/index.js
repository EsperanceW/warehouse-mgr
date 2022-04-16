const Router = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
// const { getBody } = require('../../helpers/utils');

const InventoryLog = mongoose.model('InventoryLog');

const router = new Router({
    prefix: '/inventory-log',
});

router.get('/list/:id', async (ctx) => {
    const {
        type,
    } = ctx.query;

    let {
        size,
        page,
    } = ctx.query;

    const {
        id,
    } = ctx.params;

    size = Number(size);
    page = Number(page);

    const list = await InventoryLog
        .find({
            type,
            goodsId: id,
        })
        .sort({
            _id: -1,
        })
        .skip((page - 1) * size)
        .limit(size)
        .exec();

    const total = await InventoryLog.find({
        type,
        goodsId: id,
    }).countDocuments().exec();
    
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

module.exports = router;