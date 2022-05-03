import store from '@/store';

export const getSupplierNameById = (newId) => {
  const one = store.state.supplierList.find((item) => (item.newId === newId));

  if (one) {
    return one.name;
  };

  return '未知供应商';
};
