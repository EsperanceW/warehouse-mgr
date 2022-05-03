import {
  del, post, get
} from '@/helpers/request';

export const add = (form) => {
  return post(
    '/goods/add',
    form,
  );
};

export const list = (data) => {
  return get('/goods/list', data);
};

export const remove = (id) => {
  return del(
    `/goods/${id}`,
  );
};

// export const updateCount = (data) => {
//   return post(
//     '/goods/update/count',
//     data,
//   );
// };

export const update = (data = {}) => {
  return post(
    '/goods/update',
    data,
  );
};

export const detail = (id) => {
  return get(
    `/goods/detail/${id}`,
  );
};

export const listAll = () => {
  return get('/goods/list/all');
};
