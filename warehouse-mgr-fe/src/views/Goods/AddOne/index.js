import { defineComponent, reactive } from 'vue';
import { goods } from '@/service';
import { message } from 'ant-design-vue';
import store from '@/store';
import { result, clone } from '@/helpers/utils';

const defaultFormData = {
  newId: '',
  name: '',
  price: 0,
  supplier: '',
  specification: '',
  launchDate: 0,
  classify: '',
  // count: '',
  unit: '',
};

export default defineComponent({
  props: {
    show: Boolean,
  },
  setup(props, context) {
    const addForm = reactive(clone(defaultFormData));

    if (store.state.goodsClassify.length) {
      addForm.classify = store.state.goodsClassify[0]._id;
    };

    if (store.state.goodsClassify.length) {
      addForm.supplier = store.state.supplierList[0].newId;
    };

    const submit = async () => {
      const form = clone(addForm);
      form.launchDate = addForm.launchDate.valueOf();
      const res = await goods.add(form);

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
    };
  },
});
