import {
  post, get, del
} from '@/helpers/request';

export const add = (form) => {
  return post(
    '/warehouse/add',
    form,
  );
};

export const list = (data) => {
  return get(
    '/warehouse/list',
    data,
  );
};

export const listAll = () => {
  return get('/warehouse/list/all');
};

export const remove = (id) => {
  return del(
    `/warehouse/${id}`,
  );
};

export const update = (data = {}) => {
  return post(
    '/warehouse/update',
    data,
  );
};
