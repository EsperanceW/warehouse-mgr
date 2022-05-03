import { post } from '@/helpers/request';

export const register = (account, password, name, inviteCode) => {
  return post('/auth/register', {
    account,
    password,
    name,
    inviteCode,
  });
};

export const login = (account, password) => {
  return post('/auth/login', {
    account,
    password,
  });
};
