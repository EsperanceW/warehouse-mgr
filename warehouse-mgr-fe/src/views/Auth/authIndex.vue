<template>
  <div class="auth">
    <div class="bg"></div>
    <div class="title-info">
      <img src="../../assets/img/warehouseIcon.png" alt="">
      <h2 class="title">库存管理系统</h2>
    </div>
    <div class="form">
      <a-tabs>
        <a-tab-pane key="1" tab="登录">
          <div class="item">
            <a-input size="large" placeholder="账户">
               <template #prefix>
                 <UserOutlined />
               </template>
            </a-input>
          </div>
          <div class="item">
          <a-input size="large" placeholder="密码">
            <template #prefix>
                 <LockOutlined />
            </template>
          </a-input>
          </div>
          <div class="item">
            <a href="">忘记密码</a>
          </div>
          <div class="item">
            <a-button size="large" type="primary">
              登录
            </a-button>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="注册">
          <div class="item">
            <a-input size="large" placeholder="账户" v-model:value="regForm.account">
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </div>
          <div class="item">
          <a-input size="large" placeholder="密码" v-model:value="regForm.password">
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input>
          </div>
          <div class="item">
          <a-input size="large" placeholder="邀请码">
            <template #prefix>
              <MailOutlined />
            </template>
          </a-input>
          </div>
          <div class="item">
            <a-button size="large" type="primary" @click="register">
              注册
            </a-button>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script src="./authIndex.js"></script>

<style lang="scss" scoped>
  @import './authIndex.scss';
</style>
