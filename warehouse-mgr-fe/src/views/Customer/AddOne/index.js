import { defineComponent, reactive } from 'vue';
import { customer } from '@/service';
import { result, clone } from '@/helpers/utils';
import { message } from 'ant-design-vue';

const defaultFormData = {
  newId: '',
  name: '',
  principal: '',
  contact: '',
  address: '',
};

export default defineComponent({
  props: {
    show: Boolean,
  },

  setup(props, context) {
    const addForm = reactive(clone(defaultFormData));

    const submit = async () => {
      const form = clone(addForm);
      const res = await customer.add(form);

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
    };
  },
});
