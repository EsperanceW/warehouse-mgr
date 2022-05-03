import store from '@/store';

export const getClassifyTitleById = (id) => {
  const one = store.state.goodsClassify.find((item) => (item._id === id));

  if (one) {
    return one.title;
  };

  return '未知分类';
};
