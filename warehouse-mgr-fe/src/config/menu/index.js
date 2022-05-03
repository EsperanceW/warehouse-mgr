export default [
  {
    title: '总览',
    url: '/dashboard',
    onlyAdmin: false,
  },
  {
    title: '商品列表',
    url: '/goods',
    onlyAdmin: false,
  },
  {
    title: '仓库列表',
    url: '/warehouse',
    onlyAdmin: false,
  },
  {
    title: '供应商列表',
    url: '/supplier',
    onlyAdmin: false,
  },
  {
    title: '客户列表',
    url: '/customer',
    onlyAdmin: false,
  },
  {
    title: '入库单列表',
    url: '/in-count',
    onlyAdmin: false,
  },
  {
    title: '出库单列表',
    url: '/out-count',
    onlyAdmin: false,
  },
  {
    title: '用户管理',
    url: '/user',
    onlyAdmin: true,
  },
  {
    title: '操作日志',
    url: '/log',
    onlyAdmin: true,
  },
  {
    title: '杂项',
    onlyAdmin: true,
    children: [
      {
        title: '商品分类管理',
        url: '/goods-classify',
        onlyAdmin: true,
      },
      {
        title: '重置密码申请',
        url: '/reset/password',
        onlyAdmin: true,
      },
      {
        title: '邀请码管理',
        url: '/invite-code',
        onlyAdmin: true,
      },
    ],
  },
  {
    title: '个人设置',
    url: '/profile',
    onlyAdmin: false,
  },
];
