import {
  post, get, del
} from '@/helpers/request';

export const add = (form) => {
  return post(
    '/customer/add',
    form,
  );
};

export const list = (data) => {
  return get(
    '/customer/list',
    data,
  );
};

export const listAll = () => {
  return get('/customer/list/all');
};

export const remove = (id) => {
  return del(
    `/customer/${id}`,
  );
};

export const update = (data = {}) => {
  return post(
    '/customer/update',
    data,
  );
};
