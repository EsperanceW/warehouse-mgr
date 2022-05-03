import {
  del, post, get
} from '@/helpers/request';

export const add = (title) => {
  return post('/goods-classify/add', {
    title,
  });
};

export const list = () => {
  return get('/goods-classify/list');
};

export const remove = (id) => {
  return del(`/goods-classify/${id}`);
};

export const updateTitle = (id, title) => {
  return post('/goods-classify/update/title', {
    id,
    title,
  });
};
