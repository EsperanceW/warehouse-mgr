import { defineComponent, reactive, watch } from 'vue';
import { outCount } from '@/service';
import { result } from '@/helpers/utils';
import { message } from 'ant-design-vue';
import store from '@/store';
import { getSupplierNameById } from '@/helpers/supplier-list';
import { getWarehouseNameById } from '@/helpers/warehouse-list';
import { getCustomerNameById } from '@/helpers/customer-list';

export default defineComponent({
  props: {
    show: Boolean,
    outCount: Object,
  },

  setup(props, context) {
    const editForm = reactive({
      goodsName: '',
      goodsId: '',
      supplier: '',
      warehouse: '',
      count: 0,
      customer: '',
      remark: '',
    });

    const close = () => {
      context.emit('update:show', false);
    };

    watch(() => props.outCount, (current) => {
      Object.assign(editForm, current);
    });

    const submit = async () => {
      const res = await outCount.update({
        id: props.outCount._id,
        goodsName: editForm.goodsName,
        goodsId: editForm.goodsId,
        supplier: editForm.supplier,
        warehouse: editForm.warehouse,
        count: editForm.count,
        customer: editForm.customer,
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
      getCustomerNameById,
    };
  },
});
