const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils');
const { verify, getToken } = require('../../helpers/token');

const InCount = mongoose.model('InCount');
const Goods = mongoose.model('Goods');
const Warehouse = mongoose.model('Warehouse');
const InventoryLog = mongoose.model('InventoryLog');
const InventoryDetail = mongoose.model('InventoryDetail');

const router = new Router({
    prefix: '/in-count',
});

router.post('/add', async (ctx) => {
    const {
        newId,
        goodsName,
        goodsId,
        supplier,
        count,
        warehouse,
        remark,
    } = getBody(ctx);

    const status = 0;

    const newIdOne = await InCount.findOne({
        newId: newId,
    }).exec();

    if (newIdOne) {
        ctx.body = {
            code: 0,
            msg: '入库单号已存在',
        };

        return;
    };

    const inCount = new InCount({
        newId,
        goodsName,
        goodsId,
        supplier,
        count,
        status,
        warehouse,
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

    const res = await inCount.save();

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

    const list = await InCount
        .find(query)
        .sort({
            newId: -1,
        })
        .skip((page - 1) * size)
        .limit(size)
        .exec();

    const total = await InCount.countDocuments();

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

    const delMsg = await InCount.deleteOne({
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
        remark,
    } = ctx.request.body;

    const inCountOne = await InCount.findOne({
        _id: id,
    }).exec();

    if (!inCountOne) {
        ctx.body = {
            msg: '没有找到入库单',
            code: 0,
        };

        return;
    };

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

    const newQuery = {};

    Object.entries({
        goodsName,
        goodsId,
        supplier,
        warehouse,
        count,
        remark,
    }).forEach(([key, value]) => {
        if (value) {
            newQuery[key] = value;
        };
    });

    Object.assign(inCountOne, newQuery);

    const res = await inCountOne.save();

    ctx.body = {
        data: res,
        code: 1,
        msg: '保存成功',
    };
});

// 入库操作
router.post('/update/count', async (ctx) => {
    const {
        id,
        newId,
        goodsId,
        count,
        warehouse,
        type,
    } = ctx.request.body;

    const warehouseOne = await Warehouse.findOne({
        newId: warehouse,
    }).exec();

    warehouseOne.surplusCapacity = warehouseOne.surplusCapacity - count;

    if (warehouseOne.surplusCapacity < 0) {
        ctx.body = {
            code: 0,
            msg: '剩余库存容量不足，入库失败',
        };

        return;
    };

    await warehouseOne.save();

    const one = await Goods.findOne({
        newId: goodsId,
    }).exec();

    one.count = one.count + count;

    const res  = await one.save();

    const inCountOne = await InCount.findOne({
        _id: id,
    });

    inCountOne.status = 1;

    await inCountOne.save();

    const inventoryDetailOne = await InventoryDetail.findOne({
        goodsId: goodsId,
        warehouseId: warehouse,
    }).exec();

    if (!inventoryDetailOne) {
        const inventoryGoods = await Goods.findOne({
            newId: goodsId,
        });
        const inventoryWarehouse = await Warehouse.findOne({
            newId: warehouse,
        });

        const inventoryDetail = new InventoryDetail({
            warehouseId: warehouse,
            warehouse: inventoryWarehouse.name,
            goodsId: goodsId,
            goods: inventoryGoods.name,
            count: Math.abs(count),
        });

        await inventoryDetail.save();
    } else {
        inventoryDetailOne.count = inventoryDetailOne.count + count;

        await inventoryDetailOne.save();
    };

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
        msg: '入库成功',
    };
});

module.exports = router;