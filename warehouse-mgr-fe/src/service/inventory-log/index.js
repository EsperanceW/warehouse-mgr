import axios from 'axios';

export const list = (type = 'IN_COUNT', page = 1, size = 20, id) => {
  return axios.get(
    `http://localhost:3000/inventory-log/list/${id}`,
    {
      params: {
        type,
        page,
        size,
        id,
      },
    }
  );
};
