const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils');
const { verify, getToken } = require('../../helpers/token');

const OutCount = mongoose.model('OutCount');
const Goods = mongoose.model('Goods');
const Warehouse = mongoose.model('Warehouse');
const InventoryLog = mongoose.model('InventoryLog');
const InventoryDetail = mongoose.model('InventoryDetail');

const router = new Router({
    prefix: '/out-count',
});

router.post('/add', async (ctx) => {
    const {
        newId,
        goodsName,
        goodsId,
        supplier,
        warehouse,
        count,
        customer,
        remark,
    } = getBody(ctx);

    const status = 0;

    const newIdOne = await OutCount.findOne({
        newId: newId,
    }).exec();

    if (newIdOne) {
        ctx.body = {
            code: 0,
            msg: '出库单号已存在',
        };

        return;
    };

    const outCount = new OutCount({
        newId,
        goodsName,
        goodsId,
        supplier,
        warehouse,
        count,
        customer,
        status,
        remark,
    });

    const one = await Goods.findOne({
        newId: goodsId,
    }).exec();

    if (!one) {
        ctx.body = {
            msg: '请输入商品编号或没有该商品',
            code: 0,
        };

        return; 
    }

    if (goodsName != one.name) {
        ctx.body = {
            msg: '商品名与商品编号不匹配',
            code: 0,
        };

        return;
    };

    if (supplier != one.supplier) {
        ctx.body = {
            msg: '供应商错误',
            code: 0,
        };

        return;
    };

    const res = await outCount.save();

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
        query.goodsName = keyword;
    };

    const list = await OutCount
        .find(query)
        .sort({
            newId: -1,
        })
        .skip((page - 1) * size)
        .limit(size)
        .exec();

    const total = await OutCount.countDocuments();

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
        id,
    } = ctx.params;

    const delMsg = await OutCount.deleteOne({
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
        goodsName,
        goodsId,
        supplier,
        warehouse,
        count,
        customer,
        remark,
    } = ctx.request.body;

    const outCountOne = await OutCount.findOne({
        _id: id,
    }).exec();

    if (!outCountOne) {
        ctx.body = {
            msg: '没有找到出库单',
            code: 0,
        };

        return;
    };

    const one = await Goods.findOne({
        newId: goodsId,
    }).exec();

    if (!one) {
        ctx.body = {
            msg: '没有该商品',
            code: 0,
        };

        return;
    };

    if (goodsName != one.name) {
        ctx.body = {
            msg: '商品名与商品编号不匹配',
            code: 0,
        };

        return;
    };

    if (supplier != one.supplier) {
        ctx.body = {
            msg: '供应商错误',
            code: 0,
        };

        return;
    };

    const newQuery = {};

    Object.entries({
        goodsName,
        goodsId,
        supplier,
        warehouse,
        count,
        customer,
        remark,
    }).forEach(([key, value]) => {
        if (value) {
            newQuery[key] = value;
        };
    });

    Object.assign(outCountOne, newQuery);

    const res = await outCountOne.save();

    ctx.body = {
        data: res,
        code: 1,
        msg: '保存成功',
    };
});

// 出库操作
router.post('/update/count', async (ctx) => {
    const {
        id,
        newId,
        goodsId,
        count,
        warehouse,
        type,
    } = ctx.request.body;

    const inventoryDetailOne = await InventoryDetail.findOne({
        warehouseId: warehouse,
        goodsId: goodsId,
    }).exec();

    if (!inventoryDetailOne) {
        ctx.body = {
            code: 0,
            msg: '仓库中没有存放该商品',
        };

        return;
    };

    inventoryDetailOne.count = inventoryDetailOne.count - count;

    if (inventoryDetailOne.count < 0) {
        ctx.body = {
            code: 0,
            msg: '库存不足，无法出库',
        };

        return;
    };

    await inventoryDetailOne.save();

    const warehouseOne = await Warehouse.findOne({
        newId: warehouse,
    }).exec();

    warehouseOne.surplusCapacity = warehouseOne.surplusCapacity + count;

    await warehouseOne.save();

    const one = await Goods.findOne({
        newId: goodsId,
    }).exec();

    // one.count = one.count - count;

    // if (one.count < 0) {
    //     ctx.body = {
    //         code: 0,
    //         msg: '剩下的库存数量不足以出库',
    //     };

    //     return;
    // };

    const res  = await one.save();

    const outCountOne = await OutCount.findOne({
        _id: id,
    });

    outCountOne.status = 1;

    await outCountOne.save();

    let payload = {};

    try {
        payload = await verify(getToken(ctx));
    } catch (e) {
        payload = {
            account: '未知用户',
            id: '',
        };
    };

    const log = new InventoryLog({
        num: Math.abs(count),
        type,
        goodsId,
        inOutId: newId,
        user: payload.account,
    });

    await log.save();

    ctx.body = {
        data: res,
        code: 1,
        msg: '出库成功',
    };
});

module.exports = router;