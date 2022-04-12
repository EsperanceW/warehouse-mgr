import { defineComponent, reactive } from 'vue';
import { goods } from '@/service';
import { message } from 'ant-design-vue';
import { result, clone } from '@/helpers/utils';

const defaultFormData = {
  name: '',
  price: 0,
  supplier: '',
  launchDate: 0,
  classify: '',
  count: '',
}

export default defineComponent({
  props: {
    show: Boolean,
  },
  setup(props, context) {
    const addForm = reactive(clone(defaultFormData));

    const submit = async () => {
      const form = clone(addForm);
      form.launchDate = addForm.launchDate.valueOf();
      const res = await goods.add(form);

      result(res)
        .success((d, { data }) => {
          Object.assign(addForm, defaultFormData);
          message.success(data.msg);
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
