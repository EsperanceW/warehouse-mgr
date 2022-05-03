import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { result, formatTimestamp } from '@/helpers/utils';
import { goods, inventoryLog, inventoryDetail } from '@/service';
import { CheckOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import Update from '@/views/Goods/Update/index.vue';
import { getClassifyTitleById } from '@/helpers/goods-classify';
import { getSupplierNameById } from '@/helpers/supplier-list';

const columns = [
  {
    title: '单号',
    dataIndex: 'inOutId',
  },
  {
    title: '数量',
    dataIndex: 'num',
  },
  {
    title: '操作人员',
    dataIndex: 'user',
  },
  {
    title: '操作时间',
    slots: {
      customRender: 'createdAt',
    },
  },
];

const inventoryDetailInfo = [
  {
    title: '仓库编号',
    dataIndex: 'warehouseId',
  },
  {
    title: '仓库名',
    dataIndex: 'warehouse',
  },
  {
    title: '库存',
    dataIndex: 'count',
  },
];

export default defineComponent({
  components: {
    Update,
    CheckOutlined,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();

    const { id } = route.params;
    const detailInfo = ref({});
    const log = ref([]);
    const showUpdateModal = ref(false);
    const logTotal = ref(0);
    const logCurPage = ref(1);
    const curLogType = ref('IN_COUNT');
    const detail = ref([]);
    const detailTotal = ref(0);
    const detailCurPage = ref(1);

    // 获取书籍详细信息
    const getDetail = async () => {
      const res = await goods.detail(id);

      result(res)
        .success(({ data }) => {
          detailInfo.value = data;
        });
    };

    // 获取出入库日志
    const getInventoryLog = async () => {
      const res = await inventoryLog.list(curLogType.value, logCurPage.value, 5, id);

      result(res)
        .success(( { data: { list, total } } ) => {
          log.value = list;
          logTotal.value = total;
        });
    };

    // 获取库存详情
    const getInventoryDetail = async () => {
      const res = await inventoryDetail.anotherList(detailCurPage.value, 5, id);

      result(res)
        .success(({ data: { anotherList, anotherTotal } }) => {
          detail.value = anotherList;
          detailTotal.value = anotherTotal;
        });
    };

    onMounted(() => {
      getDetail();
      getInventoryLog();
      getInventoryDetail();
    });

    // 删除操作
    const remove = async () => {
      const res = await goods.remove(id);

      result(res)
        .success(({ msg }) => {
          message.success(msg);

          router.replace('/goods');
        });
    };

    // 更新操作
    const update = (goods) => {
      Object.assign(detailInfo.value, goods);
    };

    // 日志分页切换
    const setLogPage = (page) => {
      logCurPage.value = page;

      getInventoryLog();
    };

    // 筛选日志
    const logFilter = (type) => {
      curLogType.value = type;

      getInventoryLog();
    };

    // 库存详情分页切换
    const setDetailPage = (page) => {
      detailCurPage.value = page;

      getInventoryDetail();
    };

    return {
      d: detailInfo,
      formatTimestamp,
      remove,
      showUpdateModal,
      update,
      log,
      logTotal,
      setLogPage,
      columns,
      logFilter,
      curLogType,
      logCurPage,
      getClassifyTitleById,
      getSupplierNameById,
      inventoryDetailInfo,
      detail,
      detailTotal,
      detailCurPage,
      setDetailPage,
    };
  },
});
