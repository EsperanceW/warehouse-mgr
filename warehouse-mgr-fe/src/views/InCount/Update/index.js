import { defineComponent, reactive, watch } from 'vue';
import { inCount } from '@/service';
import { result } from '@/helpers/utils';
import { message } from 'ant-design-vue';
import store from '@/store';
import { getSupplierNameById } from '@/helpers/supplier-list';
import { getWarehouseNameById } from '@/helpers/warehouse-list';

export default defineComponent({
  props: {
    show: Boolean,
    inCount: Object,
  },

  setup(props, context) {
    const editForm = reactive({
      goodsName: '',
      goodsId: '',
      supplier: '',
      warehouse: '',
      count: 0,
      remark: '',
    });

    const close = () => {
      context.emit('update:show', false);
    };

    watch(() => props.inCount, (current) => {
      Object.assign(editForm, current);
    });

    const submit = async () => {
      const res = await inCount.update({
        id: props.inCount._id,
        goodsName: editForm.goodsName,
        goodsId: editForm.goodsId,
        supplier: editForm.supplier,
        warehouse: editForm.warehouse,
        count: editForm.count,
        remark: editForm.remark,
      });

      result(res)
        .success(({ data, msg }) => {
          context.emit('update', data);

          message.success(msg);

          close();
        });
    };

    return {
      editForm,
      submit,
      props,
      close,
      store: store.state,
      getSupplierNameById,
      getWarehouseNameById,
    };
  },
});
