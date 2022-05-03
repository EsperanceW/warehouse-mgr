import store from '@/store';

export const getCustomerNameById = (newId) => {
  const one = store.state.customerList.find((item) => (item.newId === newId));

  if (one) {
    return one.name;
  };

  return '未知客户';
};
