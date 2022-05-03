const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');

const CustomerSchema = new mongoose.Schema({
    // 用户添加的客户编号
    newId: String,
    // 客户名
    name: String,
    // 负责人
    principal: String,
    // 联系方式
    contact: String,
    // 地址
    address: String,

    meta: getMeta(),
});

CustomerSchema.pre('save', preSave);

mongoose.model('Customer', CustomerSchema);