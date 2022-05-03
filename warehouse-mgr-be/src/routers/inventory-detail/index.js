const Router = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
// const { getBody } = require('../../helpers/utils');

const InventoryDetail = mongoose.model('InventoryDetail');

const router = new Router({
    prefix: '/inventory-detail',
});

router.get('/list/:id', async (ctx) => {
    let {
        size,
        page,
    } = ctx.query;

    const {
        keyword,
    } = ctx.query;

    const {
        id,
    } = ctx.params;

    size = Number(size);
    page = Number(page);

    if (keyword) {
        const list = await InventoryDetail
            .find({
                warehouseId: id,
                goods: keyword,
            })
            .sort({
                goodsId: 1,
            })
            .skip((page - 1) * size)
            .limit(size)
            .exec();

        const total = await InventoryDetail.find({
            warehouseId: id,
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
    } else {
        const list = await InventoryDetail
            .find({
                warehouseId: id,
            })
            .sort({
                _id: -1,
            })
            .skip((page - 1) * size)
            .limit(size)
            .exec();

        const total = await InventoryDetail.find({
            warehouseId: id,
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
    };
});

router.delete('/:id', async (ctx) => {
    const {
        id,
    } = ctx.params;

    const delJudge = await InventoryDetail.findOne({
        _id: id,
    });

    if (delJudge.count > 0) {
        ctx.body = {
            msg: '商品库存不为零，无法删除',
            code: 0,
        };

        return;
    };

    const delMsg = await InventoryDetail.deleteOne({
        _id: id,
    });

    ctx.body = {
        data: delMsg,
        msg: '删除成功',
        code: 1,
    };
});

router.get('/another-list/:id', async (ctx) => {
    let {
        size,
        page,
    } = ctx.query;

    const {
        id,
    } = ctx.params;

    size = Number(size);
    page = Number(page);

    const anotherList = await InventoryDetail
        .find({
            goodsId: id,
        })
        .sort({
            warehouseId: 1,
        })
        .skip((page - 1) * size)
        .limit(size)
        .exec();

    const anotherTotal = await InventoryDetail.find({
        goodsId: id,
    }).countDocuments().exec();

    ctx.body = {
        data: {
            anotherTotal,
            anotherList,
            page,
            size,
        },
        code: 1,
        msg: '获取列表成功',
    };
});

module.exports = router;