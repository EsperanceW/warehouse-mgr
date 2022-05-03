const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');

const SupplierSchema = new mongoose.Schema({
    // 用户添加的供应商编号
    newId: String,
    // 供应商名
    name: String,
    // 负责人
    principal: String,
    // 联系方式
    contact: String,
    // 地址
    address: String,

    meta: getMeta(),
});

SupplierSchema.pre('save', preSave);

mongoose.model('Supplier', SupplierSchema);