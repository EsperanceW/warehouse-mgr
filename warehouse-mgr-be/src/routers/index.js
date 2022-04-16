const auth = require('./auth');
const inviteCode = require('./invite-code');
const goods = require('./goods');
const inventoryLog = require('./inventory-log');
const user = require('./user');

module.exports = (app) => {
    app.use(auth.routes());
    app.use(inviteCode.routes());
    app.use(goods.routes());
    app.use(inventoryLog.routes());
    app.use(user.routes());
};