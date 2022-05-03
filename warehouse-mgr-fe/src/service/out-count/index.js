import {
  post, get, del
} from '@/helpers/request';

export const add = (form) => {
  return post(
    '/out-count/add',
    form,
  );
};

export const list = (data) => {
  return get(
    '/out-count/list',
    data,
  );
};

export const remove = (id) => {
  return del(
    `/out-count/${id}`,
  );
};

export const update = (data = {}) => {
  return post(
    '/out-count/update',
    data,
  );
};

export const updateCount = (data) => {
  return post(
    '/out-count/update/count',
    data,
  );
};
