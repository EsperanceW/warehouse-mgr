const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');

const InventoryLogSchema = new mongoose.Schema({
    // 出入库类型
    type:String,
    // 出入库数量
    num: Number,
    // 操作人员
    user: String,
    // 对应商品
    goodsId: String,

    meta: getMeta(),
});

InventoryLogSchema.pre('save', preSave);

mongoose.model('InventoryLog', InventoryLogSchema);