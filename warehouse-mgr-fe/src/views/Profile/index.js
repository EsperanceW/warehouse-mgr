import { defineComponent, reactive } from 'vue';
import { profile } from '@/service';
import { result } from '@/helpers/utils';
import { message } from 'ant-design-vue';

export default defineComponent({
  setup() {
    const resetPasswordForm = reactive({
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    });

    const resetPassword = async () => {
      if (resetPasswordForm.confirmNewPassword !== resetPasswordForm.newPassword) {
        message.error('两次输入的密码不同');

        return;
      };

      const res = await profile.resetPassword(
        resetPasswordForm.newPassword,
        resetPasswordForm.oldPassword,
      );

      result(res)
        .success(({ msg }) => {
          message.success(msg);

          resetPasswordForm.oldPassword = '';
          resetPasswordForm.newPassword = '';
          resetPasswordForm.confirmNewPassword = '';
        });
    };

    return {
      resetPasswordForm,
      resetPassword,
    };
  },
});
