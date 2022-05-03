import { defineComponent, ref, onMounted, reactive } from 'vue';
import { user } from '@/service';
import { message } from 'ant-design-vue';
import { EditOutlined } from '@ant-design/icons-vue';
import { result, formatTimestamp } from '@/helpers/utils';
import AddOne from './AddOne/index.vue';
import { getCharacterInfoById } from '@/helpers/character';
import store from '@/store';

const columns = [
  {
    title: '账户',
    dataIndex: 'account',
  },
  {
    title: '姓名',
    slots: {
      customRender: 'name',
    },
  },
  {
    title: '创建日期',
    slots: {
      customRender: 'createdAt',
    },
  },
  {
    title: '角色',
    slots: {
      customRender: 'character',
    },
  },
  {
    title: '操作',
    slots: {
      customRender: 'actions',
    },
  }
];

export default defineComponent({
  components: {
    AddOne,
    EditOutlined,
  },

  setup() {
    const list = ref([]);
    const curPage = ref(1);
    const total = ref(0);
    const showAddModal = ref(false);
    const keyword = ref('');
    const isSearch = ref(false);
    const showEditCharacterModal = ref(false);
    const showEditNameModal = ref(false);

    const editForm = reactive({
      character: '',
      name: '',
      current: {},
    });

    const getUser = async () => {
      const res = await user.list(curPage.value, 10, keyword.value);

      result(res)
        .success(({ data: { list: refList, total: refTotal } }) => {
          list.value = refList;
          total.value = refTotal;
        });
    };

    onMounted(() => {
      getUser();
    });

    const remove = async ({ _id }) => {
      const res = await user.remove(_id);

      result(res)
        .success(({ msg }) => {
          message.success(msg);
          getUser();
        });
    };

    const setPage = (page) => {
      curPage.value = page;

      getUser();
    };

    const resetPassword = async ({ _id }) => {
      const res = await user.resetPassword(_id);

      result(res)
        .success(({ msg }) => {
          message.success(msg)
        });
    };

    const onSearch = () => {
      getUser();
      isSearch.value = !!keyword.value;
    };

    const backAll = () => {
      isSearch.value = false;
      keyword.value = '';
      getUser();
    };

    const onEdit = (record) => {
      showEditCharacterModal.value = true;

      editForm.current = record;
      editForm.character = record.character;
    };

    const onEditName = (record) => {
      showEditNameModal.value = true;

      editForm.current = record;
      editForm.name = record.name;
    };

    const updateCharacter = async () => {
      const res = await user.editCharacter(editForm.character, editForm.current._id);

      result(res)
        .success(({ msg }) => {
          message.success(msg);
          showEditCharacterModal.value = false;
          editForm.current.character = editForm.character;
        });
    };

    const updateName = async () => {
      const res = await user.editName(editForm.name, editForm.current._id);

      result(res)
        .success(({ msg }) => {
          message.success(msg);
          showEditNameModal.value = false;
          editForm.current.name = editForm.name;
        });
    };

    return {
      list,
      total,
      curPage,
      columns,
      formatTimestamp,
      remove,
      showAddModal,
      getUser,
      setPage,
      resetPassword,
      isSearch,
      keyword,
      backAll,
      onSearch,
      getCharacterInfoById,
      showEditCharacterModal,
      editForm,
      onEdit,
      characterInfo: store.state.characterInfo,
      updateCharacter,
      showEditNameModal,
      onEditName,
      updateName,
    };
  },
});
