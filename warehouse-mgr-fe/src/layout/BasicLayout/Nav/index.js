import { defineComponent, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import menu from '@/config/menu';

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();

    const openKeys = ref(['']);
    const selectedKeys = ref([]);

    onMounted(() => {
      selectedKeys.value = [route.path];

      // 选中“杂项”里的内容时 “杂项”下的二级目录才会自动展开
      menu.forEach((item) => {
        (item.children || []).forEach((children) => {
          if (children.url === route.path) {
            openKeys.value.push(item.title);
          };
        });
      });
    });

    const to = (url) => {
      router.push(url);
    };

    return {
      openKeys,
      selectedKeys,
      menu,
      to,
    };
  },
});
