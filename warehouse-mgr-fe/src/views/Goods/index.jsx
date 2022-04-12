import { defineComponent, ref, onMounted } from 'vue';
import { goods } from '@/service';
import { result, formatTimestamp } from '@/helpers/utils';
import AddOne from './AddOne/index.vue';
import Update from './Update/index.vue';
import { message, Modal, Input } from 'ant-design-vue';

export default defineComponent({
  components: {
    AddOne,
    Update,
  },

  setup() {
    const columns = [
      {
        title: '商品名',
        dataIndex: 'name'
      },
      {
        title: '供应商',
        dataIndex: 'supplier'
      },
      {
        title: '价格',
        dataIndex: 'price'
      },
      {
        title: '上市日期',
        dataIndex: 'launchDate',
        slots: {
          customRender: 'launchDate',
        },
      },
      {
        title: '分类',
        dataIndex: 'classify'
      },
      {
        title: '库存',
        slots: {
          customRender: 'count',
        },
      },
      {
        title: '操作',
        slots: {
          customRender: 'actions',
        },
      },
    ];

    const show = ref(false);
    const showUpdateModal = ref(false);
    const list = ref([]);
    const total = ref(0);
    const curPage = ref(1);
    const keyword = ref('');
    const isSearch = ref(false);
    const curEditGoods = ref({});

    // 获取商品列表
    const getList = async () => {
      const res = await goods.list({
        page: curPage.value,
        size: 10,
        keyword: keyword.value,
      });

      result(res).success(({ data }) => {
        const { list: l, total: t } = data;
        list.value = l;
        total.value = t;
      });
    };

    onMounted(async () => {
      getList();
    });

    // 设置页码 切页
    const setPage = (page) => {
      curPage.value = page;

      getList();
    };

    // 触发搜索
    const onSearch = () => {
      getList();

      // 字符串非空的时候 -> true
      // 字符串为空的时候 -> false
      isSearch.value =  Boolean(keyword.value);
    };

    // 回到全部列表
    const backAll = () => {
      keyword.value = '';
      isSearch.value = false;

      getList();
    };

    // 删除一件商品
    const remove = async ({ text: record }) => {
      const { _id } = record;

      const res = await goods.remove(_id);

      result(res)
        .success(({ msg }) => {
          message.success(msg);

          // const idx = list.value.findIndex((item) => {
          //   return item._id === _id;
          // });

          // list.value.splice(idx, 1);

          getList();
        });
    };

    // 更新库存数量
    const updateCount = (type, record) => {
      let word = '增加';

      if (type === 'OUT_COUNT') {
        word = '减少';
      };

      Modal.confirm({
        title: `要${word}多少库存`,
        content: (
          <div>
            <Input class="__goods_input_count" />
          </div>
        ),

        onOk: async () => {
          const el = document.querySelector('.__goods_input_count');
          let num = el.value;

          const res = await goods.updateCount({
            id: record._id,
            num,
            type,
          });

          result(res)
            .success((data) => {
              if (type === 'IN_COUNT') {
                num = Math.abs(num);
              } else {
                num = - Math.abs(num);
              };

              const one = list.value.find((item) => {
                return item._id === record._id;
              });

              if (one) {
                one.count = one.count + num;

                message.success(`成功${word} ${Math.abs(num)} 件商品`);
              }
            });
        },
      });
    };

    // 编辑商品信息
    const update = ({ record }) => {
      showUpdateModal.value = true;
      curEditGoods.value = record;
    };

    const updateCurGoods = (newData) => {
      Object.assign(curEditGoods.value, newData);
    };

    return {
      columns,
      show,
      list,
      formatTimestamp,
      curPage,
      total,
      setPage,
      keyword,
      onSearch,
      backAll,
      isSearch,
      remove,
      updateCount,
      showUpdateModal,
      update,
      curEditGoods,
      updateCurGoods,
    };
  },
});
