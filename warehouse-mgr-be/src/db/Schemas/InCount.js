const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');

const InCountSchema = new mongoose.Schema({
    // 用户添加的入库单号
    newId: String,
    // 商品名
    goodsName: String,
    // 商品编号
    goodsId: String,
    // 供应商编号
    supplier: String,
    // 数量
    count: Number,
    // 入库状态码 0为未入库 1为已入库
    status: Number,
    // 入库仓库编号
    warehouse: String,
    // 备注
    remark: String,
    
    meta: getMeta(),
});

InCountSchema.pre('save', preSave);

mongoose.model('InCount', InCountSchema);