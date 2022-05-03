import {
  del, post, get
} from '@/helpers/request';

export const list = (page = 1, size = 20, keyword = '') => {
  return get(
    '/user/list',
    {
      page,
      size,
      keyword,
    }
  );
};

export const remove = (id) => {
  return del(`/user/${id}`);
};

export const add = (account, password, name, character) => {
  return post('/user/add', {
    account,
    password,
    name,
    character,
  });
};

export const resetPassword = (id) => {
  return post('/user/reset/password', {
    id,
  });
};

export const editCharacter = (characterId, userId) => {
  return post('/user/update/character', {
    character: characterId,
    userId: userId,
  });
};

export const editName = (name, userId) => {
  return post('/user/update/name', {
    name,
    userId: userId,
  });
};

export const info = () => {
  return get('/user/info');
};
