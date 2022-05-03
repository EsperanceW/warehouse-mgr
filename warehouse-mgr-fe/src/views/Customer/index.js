import { defineComponent, ref, onMounted } from 'vue';
import { customer } from '@/service';
import { result } from '@/helpers/utils';
import AddOne from './AddOne/index.vue';
import Update from './Update/index.vue';
import { message } from 'ant-design-vue';

export default defineComponent({
  components: {
    AddOne,
    Update,
  },

  props: {
    simple: Boolean,
  },

  setup(props) {
    const columns = [
      {
        title: '客户编号',
        dataIndex: 'newId',
      },
      {
        title: '客户名',
        dataIndex: 'name',
      },
      {
        title: '负责人',
        dataIndex: 'principal',
      },
      {
        title: '联系方式',
        dataIndex: 'contact',
      },
      {
        title: '地址',
        dataIndex: 'address',
      },
    ];

    if (!props.simple) {
      columns.push({
        title: '操作',
        slots: {
          customRender: 'actions',
        },
      });
    };

    const show = ref(false);
    const list = ref([]);
    const curPage = ref(1);
    const total = ref(0);
    const keyword = ref('');
    const isSearch = ref(false);
    const showUpdateModal = ref(false);
    const curEditCustomer = ref({});

    const getList = async () => {
      const res = await customer.list({
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

      const res = await customer.remove(_id);

      result(res)
        .success(({ msg }) => {
          message.success(msg);

          getList();
        });
    };

    const update = ({ record }) => {
      showUpdateModal.value = true;
      curEditCustomer.value = record;
    };

    const updateCurCustomer = (newData) => {
      Object.assign(curEditCustomer.value, newData);
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
      curEditCustomer,
      updateCurCustomer,
      getList,
      simple: props.simple,
    };
  },
});
