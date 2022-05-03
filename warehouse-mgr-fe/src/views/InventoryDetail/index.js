import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { result } from '@/helpers/utils';
import { inventoryDetail } from '@/service';
import { message } from 'ant-design-vue';

export default defineComponent({
  setup() {
    const columns = [
      {
        title: '商品编号',
        dataIndex: 'goodsId',
      },
      {
        title: '商品名',
        dataIndex: 'goods',
      },
      {
        title: '库存',
        dataIndex: 'count',
      },
      {
        title: '操作',
        slots: {
          customRender: 'actions',
        },
      },
    ];

    const route = useRoute();

    const { id } = route.params;
    const detail = ref([]);
    const detailTotal = ref(0);
    const detailCurPage = ref(1);
    const keyword = ref('');
    const isSearch = ref(false);

    const getInventoryDetail = async () => {
      const res = await inventoryDetail.list(detailCurPage.value, 10, id, keyword.value);

      result(res)
        .success(({ data: { list, total } }) => {
          detail.value = list;
          detailTotal.value = total;
        });
    };

    onMounted(() => {
      getInventoryDetail();
    });

    const setDetailPage = (page) => {
      detailCurPage.value = page;

      getInventoryDetail();
    };

    const remove = async ({ text: record }) => {
      const { _id } = record;

      const res = await inventoryDetail.remove(_id);

      result(res)
        .success(({ msg }) => {
          message.success(msg);

          getInventoryDetail();
        });
    };

    const onSearch = () => {
      getInventoryDetail();
      isSearch.value = Boolean(keyword.value);
    };

    const backAll = () => {
      keyword.value = '';
      isSearch.value = false;

      getInventoryDetail();
    };

    return {
      detail,
      detailTotal,
      detailCurPage,
      setDetailPage,
      columns,
      remove,
      onSearch,
      backAll,
      keyword,
      isSearch,
    };
  },
});
