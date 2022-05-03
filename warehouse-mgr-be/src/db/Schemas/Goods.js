const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');

const GoodsSchema = new mongoose.Schema({
    // 用户添加的商品编号
    newId: String,
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
    // 规格
    specification: String,
    // 单位
    unit: String,

    meta: getMeta(),
});

GoodsSchema.pre('save', preSave);

mongoose.model('Goods', GoodsSchema);