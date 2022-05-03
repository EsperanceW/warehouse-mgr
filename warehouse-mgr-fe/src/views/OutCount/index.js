import { defineComponent, ref, onMounted } from 'vue';
import { outCount } from '@/service';
import { result } from '@/helpers/utils';
import AddOne from './AddOne/index.vue';
import Update from './Update/index.vue';
import { message } from 'ant-design-vue';
import { getSupplierNameById } from '@/helpers/supplier-list';
import { getWarehouseNameById } from '@/helpers/warehouse-list';
import { getCustomerNameById } from '@/helpers/customer-list';

export default defineComponent({
  components: {
    AddOne,
    Update,
  },

  setup() {
    const columns = [
      {
        title: '出库单号',
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
        title: '出库仓库',
        slots: {
          customRender: 'warehouse',
        },
      },
      {
        title: '出库数量',
        dataIndex: 'count',
      },
      {
        title: '客户',
        slots: {
          customRender: 'customer',
        },
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
    const curEditOutCount = ref({});
    const type = 'OUT_COUNT';

    const getList = async () => {
      const res = await outCount.list({
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

      const res = await outCount.remove(_id);

      result(res)
        .success(({ msg }) => {
          message.success(msg);

          getList();
        });
    };

    const update = ({ record }) => {
      showUpdateModal.value = true;
      curEditOutCount.value = record;
    };

    const updateCurOutCount = (newData) => {
      Object.assign(curEditOutCount.value, newData);
    };

    const updateCount = async ({ record }) => {
        const res = await outCount.updateCount({
          id: record._id,
          newId: record.newId,
          goodsId: record.goodsId,
          count: record.count,
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
      curEditOutCount,
      updateCurOutCount,
      getList,
      getSupplierNameById,
      updateCount,
      getWarehouseNameById,
      getCustomerNameById,
    };
  },
});
