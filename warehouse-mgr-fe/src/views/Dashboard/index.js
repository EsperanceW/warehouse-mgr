import { defineComponent, onMounted, ref } from 'vue';
import { result } from '@/helpers/utils';
import { dashboard } from '@/service';
import Goods from '@/views/Goods/index.vue';
import Supplier from '@/views/Supplier/index.vue';
// import Log from '@/views/Log/index.vue';

export default defineComponent({
  components: {
    Goods,
    Supplier,
    // Log,
  },

  setup() {
    const loading = ref(true);

    const baseInfo = ref({
      total: {
        goods: 0,
        user: 0,
        supplier: 0,
        inCount: 0,
        outCount: 0,
        log: 0,
      },
    });

    const getBaseInfo = async () => {
      loading.value = true;

      const res = await dashboard.baseInfo();

      loading.value = false;

      result(res)
        .success(({ data }) => {
          baseInfo.value = data;
        });
    };

    onMounted(() => {
      getBaseInfo();
    });

    return {
      baseInfo,
      loading,
    };
  },
});
