import {
  post, get, del
} from '@/helpers/request';

export const add = (form) => {
  return post(
    '/supplier/add',
    form,
  );
};

export const list = (data) => {
  return get(
    '/supplier/list',
    data,
  );
};

export const listAll = () => {
  return get('/supplier/list/all');
};

export const remove = (id) => {
  return del(
    `/supplier/${id}`,
  );
};

export const update = (data = {}) => {
  return post(
    '/supplier/update',
    data,
  );
};
