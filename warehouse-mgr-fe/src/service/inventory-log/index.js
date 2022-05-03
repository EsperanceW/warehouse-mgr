import { get } from '@/helpers/request';

export const list = (type = 'IN_COUNT', page, size, id) => {
  return get(
    `/inventory-log/list/${id}`,
    {
        type,
        page,
        size,
        id,
    },
  );
};
