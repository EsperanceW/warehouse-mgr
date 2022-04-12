const mongoose = require('mongoose');
const { getMeta } = require('../helpers');

const GoodsSchema = new mongoose.Schema({
    // 商品名
    name: String,
    // 价格
    price: Number,
    // 供应商
    supplier: String,
    // 上市日期
    launchDate: String,
    // 分类
    classify: String,
    // 库存
    count: Number,

    meta: getMeta(),
});

mongoose.model('Goods', GoodsSchema);