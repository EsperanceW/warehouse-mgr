const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');

const GoodsClassifySchema = new mongoose.Schema({
    title: String,

    meta: getMeta(),
});

GoodsClassifySchema.pre('save', preSave);

mongoose.model('GoodsClassify', GoodsClassifySchema);