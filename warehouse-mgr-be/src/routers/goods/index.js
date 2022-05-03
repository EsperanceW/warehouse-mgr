const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils');

const GOODS_CONST = {
    IN: 'IN_COUNT',
    OUT: 'OUT_COUNT',
};

const Goods = mongoose.model('Goods');
// const InventoryLog = mongoose.model('InventoryLog');

const findGoodsOne = async (id) => {
    const one = await Goods.findOne({
        _id: id,
    }).exec();

    return one;
};

const router = new Router({
    prefix: '/goods',
});

router.post('/add', async (ctx) => {
    const {
        newId,
        name,
        price,
        supplier,
        launchDate,
        classify,
    } = getBody(ctx);

    let count = 0;

    const newIdOne = await Goods.findOne({
        newId: newId,
    }).exec();

    if (newIdOne) {
        ctx.body = {
            code: 0,
            msg: '商品编号已存在',
        };

        return;
    };

    const goods = new Goods({
        newId,
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

    let {
        size = 10,
    } = ctx.query;

    size = Number(size);

    const query = {};

    if (keyword) {
        query.name = keyword;
    };

    const list = await Goods
        .find(query)
        .sort({
            newId: -1,
        })
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

    const delJudge = await Goods.findOne({
        _id: id,
    }).exec();

    if (delJudge.count > 0) {
        ctx.body = {
            code: 0,
            msg: '该商品库存不为零，无法删除',
        };

        return;
    };

    const delMsg = await Goods.deleteOne({
        _id: id,
    });

    ctx.body = {
        data:delMsg,
        msg: '删除成功',
        code: 1,
    };
});

// router.post('/update/count', async (ctx) => {
//     const {
//         id,
//         type,
//     } = ctx.request.body;

//     let {
//         num,
//     } = ctx.request.body;

//     num = Number(num);

//     const goods = await findGoodsOne(id);

//     // 没有找到商品
//     if (!goods) {
//         ctx.body = {
//             code: 0,
//             msg: '没有找到商品',
//         };

//         return;
//     };

//     // 找到了商品
//     if (type === GOODS_CONST.IN) {
//         // 入库操作
//         num = Math.abs(num);
//     } else {
//         // 出库操作
//         num = - Math.abs(num);
//     };

//     goods.count = goods.count + num;

//     if (goods.count < 0) {
//         ctx.body = {
//             code: 0,
//             msg: '剩下的量不足以出库',
//         }

//         return;
//     };

//     const res = await goods.save();

//     const log = new InventoryLog({
//         num: Math.abs(num),
//         type,
//         goodsId: id,
//     });

//     log.save();

//     ctx.body = {
//         data: res,
//         code: 1,
//         msg: '操作成功',
//     }
// });

router.post('/update', async (ctx) => {
    const {
        id,
        name,
        price,
        supplier,
        launchDate,
        classify,
        specification,
        unit,
    } = ctx.request.body;

    const one = await findGoodsOne(id);

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

    Object.entries({
        name,
        price,
        supplier,
        launchDate,
        classify,
        specification,
        unit,
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

router.get('/detail/:id', async (ctx) => {
    const {
        id,
    } = ctx.params;

    const one = await Goods.findOne({
        newId: id,
    });

    // 没有找到商品
    if (!one) {
        ctx.body = {
            code: 0,
            msg: '没有找到商品',
        }
        return;
    };

    ctx.body = {
        msg: '查询成功',
        data: one,
        code: 1,
    };
});

router.get('/list/all', async (ctx) => {
    const list = await Goods.find().sort({
        _id: -1,
    }).exec();

    ctx.body = {
        data: list,
        code: 1,
        msg: '获取成功',
    };
});

module.exports = router;