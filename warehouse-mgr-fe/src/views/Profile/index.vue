<template>
  <div>
    <a-card>
      <h2>修改密码</h2>
      <a-divider></a-divider>
      <a-form style="width: 680px;" :model="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
        <a-form-item label="原密码">
          <a-input type="password" v-model:value="resetPasswordForm.oldPassword" />
        </a-form-item>
        <a-form-item label="新密码">
          <a-input type="password" v-model:value="resetPasswordForm.newPassword" />
        </a-form-item>
        <a-form-item label="确认密码">
          <a-input type="password" v-model:value="resetPasswordForm.confirmNewPassword" />
          <div style="margin-top: 24px;">
            <a-button type="primary" @click="resetPassword">修改</a-button>
          </div>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script src="./index.js"></script>
