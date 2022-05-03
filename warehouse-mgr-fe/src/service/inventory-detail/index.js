import { get, del } from '@/helpers/request';

export const list = (page, size, id, keyword) => {
  return get(
    `/inventory-detail/list/${id}`,
    {
      page,
      size,
      id,
      keyword,
    },
  );
};

export const remove = (id) => {
  return del(
    `/inventory-detail/${id}`,
  );
};

export const anotherList = (page, size, id) => {
  return get(
    `/inventory-detail/another-list/${id}`,
    {
      page,
      size,
      id,
    },
  );
};
