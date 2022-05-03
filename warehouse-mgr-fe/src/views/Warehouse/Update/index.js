import { defineComponent, reactive, watch } from 'vue';
import { warehouse } from '@/service';
import { result } from '@/helpers/utils';
import { message } from 'ant-design-vue';

export default defineComponent({
  props: {
    show: Boolean,
    warehouse: Object,
  },

  setup(props, context) {
    const editForm = reactive({
      name: '',
      principal: '',
      contact: '',
      address: '',
      totalCapacity: 0,
    });

    const close = () => {
      context.emit('update:show', false);
    };

    // watch 是用来监听 supplier 是否发生变化 如果变化了就触发传递给它的回调
    watch(() => props.warehouse, (current) => {
      Object.assign(editForm, current);
    });

    const submit = async () => {
      const res = await warehouse.update({
        id: props.warehouse._id,
        name: editForm.name,
        principal: editForm.principal,
        contact: editForm.contact,
        address: editForm.address,
        totalCapacity: editForm.totalCapacity,
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
    };
  },
});
