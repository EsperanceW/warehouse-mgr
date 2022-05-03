const Router = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const config = require('../../project.config');
// const { getBody } = require('../../helpers/utils');

const User = mongoose.model('User');
const Goods = mongoose.model('Goods');
const Supplier = mongoose.model('Supplier');
const InCount = mongoose.model('InCount');
const OutCount = mongoose.model('OutCount');
const Log = mongoose.model('Log');

const router = new Router({
    prefix: '/dashboard',
});

router.get('/base-info', async (ctx) => {
    const goodsTotal = await Goods.countDocuments();
    const userTotal = await User.countDocuments();
    const supplierTotal = await Supplier.countDocuments();
    const inCountTotal = await InCount.countDocuments();
    const outCountTotal = await OutCount.countDocuments();
    const logTotal = await Log.find({ show: true }).countDocuments();

    ctx.body = {
        code: 1,
        msg: '获取成功',
        data: {
            total: {
                goods: goodsTotal,
                user: userTotal,
                supplier: supplierTotal,
                inCount: inCountTotal,
                outCount: outCountTotal,
                log: logTotal,
            },
        },
    };
});

module.exports = router;