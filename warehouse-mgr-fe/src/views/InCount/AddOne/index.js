import { defineComponent, reactive } from 'vue';
import { inCount } from '@/service';
import { result, clone } from '@/helpers/utils';
import { message } from 'ant-design-vue';
import store from '@/store';
import { getSupplierNameById } from '@/helpers/supplier-list';
import { getWarehouseNameById } from '@/helpers/warehouse-list';

const defaultFormData = {
  newId: '',
  goodsName: '',
  goodsId: '',
  supplier: '',
  count: 0,
  warehouse: '',
  remark: '',
};

export default defineComponent({
  props: {
    show: Boolean,
  },

  setup(props, context) {
    const addForm = reactive(clone(defaultFormData));

    const submit = async () => {
      const form = clone(addForm);
      const res = await inCount.add(form);

      result(res)
        .success((d, { data }) => {
          Object.assign(addForm, defaultFormData);
          message.success(data.msg);

          context.emit('getList');
        });
    };

    const close = () => {
      context.emit('update:show', false);
    };

    return {
      addForm,
      submit,
      props,
      close,
      store: store.state,
      getSupplierNameById,
      getWarehouseNameById,
    };
  },
});
