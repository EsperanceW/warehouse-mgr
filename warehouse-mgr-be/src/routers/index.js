const auth = require('./auth');
const inviteCode = require('./invite-code');
const goods = require('./goods');

module.exports = (app) => {
    app.use(auth.routes());
    app.use(inviteCode.routes());
    app.use(goods.routes());
};