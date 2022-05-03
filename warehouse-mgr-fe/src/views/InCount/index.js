import { defineComponent, ref, onMounted } from 'vue';
import { inCount } from '@/service';
import { result } from '@/helpers/utils';
import AddOne from './AddOne/index.vue';
import Update from './Update/index.vue';
import { message } from 'ant-design-vue';
import { getSupplierNameById } from '@/helpers/supplier-list';
import { getWarehouseNameById } from '@/helpers/warehouse-list';

export default defineComponent({
  components: {
    AddOne,
    Update,
  },

  setup() {
    const columns = [
      {
        title: '入库单号',
        dataIndex: 'newId',
      },
      {
        title: '商品名',
        dataIndex: 'goodsName',
      },
      {
        title: '商品编号',
        dataIndex: 'goodsId',
      },
      {
        title: '供应商',
        slots: {
          customRender: 'supplier',
        },
      },
      {
        title: '入库仓库',
        slots: {
          customRender: 'warehouse',
        },
      },
      {
        title: '入库数量',
        dataIndex: 'count',
      },
      {
        title: '备注',
        dataIndex: 'remark',
      },
      {
        title: '操作',
        slots: {
          customRender: 'actions',
        },
      },
    ];

    const show = ref(false);
    const list = ref([]);
    const curPage = ref(1);
    const total = ref(0);
    const keyword = ref('');
    const isSearch = ref(false);
    const showUpdateModal = ref(false);
    const curEditInCount = ref({});
    const type = 'IN_COUNT';

    const getList = async () => {
      const res = await inCount.list({
        page: curPage.value,
        size: 10,
        keyword: keyword.value,
      });

      result(res)
        .success(({ data }) => {
          const { list: l, total: t } = data;
          list.value = l;
          total.value = t;
        });
    };

    onMounted(async () => {
      getList();
    });

    const setPage = (page) => {
      curPage.value = page;

      getList();
    };

    const onSearch = () => {
      getList();
      isSearch.value = Boolean(keyword.value);
    };

    const backAll = () => {
      keyword.value = '';
      isSearch.value = false;

      getList();
    };

    const remove = async ({ text: record }) => {
      const { _id } = record;

      const res = await inCount.remove(_id);

      result(res)
        .success(({ msg }) => {
          message.success(msg);

          getList();
        });
    };

    const update = ({ record }) => {
      showUpdateModal.value = true;
      curEditInCount.value = record;
    };

    const updateCurInCount = (newData) => {
      Object.assign(curEditInCount.value, newData);
    };

    const updateCount = async ({ record }) => {
        const res = await inCount.updateCount({
          id: record._id,
          newId: record.newId,
          goodsId: record.goodsId,
          count: record.count,
          warehouse: record.warehouse,
          type,
        });

        result(res)
          .success(({ msg }) => {
            message.success(msg);

            getList();
          });
    };

    return {
      columns,
      list,
      show,
      curPage,
      total,
      setPage,
      keyword,
      onSearch,
      backAll,
      isSearch,
      remove,
      showUpdateModal,
      update,
      curEditInCount,
      updateCurInCount,
      getList,
      getSupplierNameById,
      updateCount,
      getWarehouseNameById,
    };
  },
});
