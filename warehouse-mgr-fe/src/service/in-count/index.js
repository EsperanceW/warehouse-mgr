import {
  post, get, del
} from '@/helpers/request';

export const add = (form) => {
  return post(
    '/in-count/add',
    form,
  );
};

export const list = (data) => {
  return get(
    '/in-count/list',
    data,
  );
};

export const remove = (id) => {
  return del(
    `/in-count/${id}`,
  );
};

export const update = (data = {}) => {
  return post(
    '/in-count/update',
    data,
  );
};

export const updateCount = (data) => {
  return post(
    '/in-count/update/count',
    data,
  );
};
