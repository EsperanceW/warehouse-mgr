const getMeta = () => {
    return{
        createAt: {
            type: Number,
            default: (new Date()).getTime(),
        },
        updatedAt: {
            type: Number,
            default: (new Date()).getTime(),
        },
    };
};

module.exports = {
    getMeta,
}