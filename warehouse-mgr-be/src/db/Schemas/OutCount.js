const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');

const OutCountSchema = new mongoose.Schema({
    // 用户添加的出库单号
    newId: String,
    // 商品名
    goodsName: String,
    // 商品编号
    goodsId: String,
    // 供应商
    supplier: String,
    // 出库仓库
    warehouse: String,
    // 数量
    count: Number,
    // 客户
    customer: String,
    // 出库状态码 0为未出库 1为已出库
    status: Number,
    // 备注
    remark: String,
    

    meta: getMeta(),
});

OutCountSchema.pre('save', preSave);

mongoose.model('OutCount', OutCountSchema);