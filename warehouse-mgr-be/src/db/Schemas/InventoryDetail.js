const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');

const InventoryDetailSchema = new mongoose.Schema({
    // 仓库编号
    warehouseId: String,
    // 仓库名
    warehouse: String,
    // 商品编号
    goodsId: String,
    // 商品名
    goods: String,
    // 库存数量
    count: Number,

    meta: getMeta(),
});

InventoryDetailSchema.pre('save', preSave);

mongoose.model('InventoryDetail', InventoryDetailSchema);