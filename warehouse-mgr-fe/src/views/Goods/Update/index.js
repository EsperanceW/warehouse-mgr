import { defineComponent, reactive, watch } from 'vue';
import { goods } from '@/service';
import { message } from 'ant-design-vue';
import { result } from '@/helpers/utils';
import moment from 'moment';
import store from '@/store';

export default defineComponent({
  props: {
    show: Boolean,
    goods: Object,
  },
  setup(props, context) {
    const editForm = reactive({
      name: '',
      price: 0,
      supplier: '',
      launchDate: 0,
      classify: '',
      specification: '',
      unit: '',
    });

    const close = () => {
      context.emit('update:show', false);
    };

    watch(() => props.goods, (current) => {
     Object.assign(editForm, current);
     editForm.launchDate = moment(Number(editForm.launchDate));
    });

    const submit = async () => {
      const res = await goods.update({
        id: props.goods._id,
        name: editForm.name,
        price: editForm.price,
        supplier: editForm.supplier,
        launchDate: editForm.launchDate.valueOf(),
        classify: editForm.classify,
        specification: editForm.specification,
        unit: editForm.unit,
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
    };
  },
});
