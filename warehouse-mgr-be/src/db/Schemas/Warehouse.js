const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');

const WarehouseSchema = new mongoose.Schema({
    // 用户添加的仓库编号
    newId: String,
    // 仓库名
    name: String,
    // 负责人
    principal: String,
    // 联系方式
    contact: String,
    // 地址
    address: String,
    // 总容量
    totalCapacity: Number,
    // 剩余容量
    surplusCapacity: Number,

    meta: getMeta(),
});

WarehouseSchema.pre('save', preSave);

mongoose.model('Warehouse', WarehouseSchema);