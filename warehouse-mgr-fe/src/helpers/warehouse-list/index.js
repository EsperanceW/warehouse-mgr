import store from '@/store';

export const getWarehouseNameById = (newId) => {
  const one = store.state.warehouseList.find((item) => (item.newId === newId));

  if (one) {
    return one.name;
  };

  return '未知仓库';
};
