`   
    -1 无任何权限
    0 管理员权限
    1 查找权限
    2 增加权限
    3 删除权限
    4 修改权限
`;

const defaultCharacters = [
    {
        title: '管理员',
        name: 'admin',
        power: {
            goods: [0],
            user: [0],
        },
    },
    {
        title: '成员',
        name: 'member',
        power: {
            goods: [1],
            user: [-1],
        },
    },
];

module.exports = {
    defaultCharacters,
};