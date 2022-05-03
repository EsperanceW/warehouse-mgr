const LOG_MAP = [
  ['/goods/list', '获取商品列表'],
  ['/user/list', '获取用户列表'],
  ['/character/list', '获取角色列表'],
  ['/inventory-log/list', '获取出入库日志列表'],
  ['/goods/detail', '获取商品详情页'],
  ['/log/list', '获取日志列表'],
  ['/user/info', '获取用户的登录信息'],
  ['/user/reset/password', '重置用户密码']
];

export const getLogInfoByPath = (path) => {
  let title = '';

  LOG_MAP.forEach((item) => {
    if (path.includes(item[0])) {
      title = path.replace(item[0], item[1]);
    }
  });

  return title || path;
};
