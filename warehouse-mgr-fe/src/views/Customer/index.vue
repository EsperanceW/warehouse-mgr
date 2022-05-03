<template>
  <div>
    <a-card :title="simple ? '最近添加的客户' : ''">
      <div v-if="!simple">
        <h2>客户列表</h2>
        <a-divider></a-divider>
        <space-between>
          <div class="search">
            <a-input-search placeholder="根据客户名搜索" enter-button v-model:value="keyword" @search="onSearch" />
            <a v-if="isSearch" href="javascript:;" @click="backAll">返回</a>
          </div>
          <a-button @click="show = true">添加一条</a-button>
        </space-between>
        <a-divider></a-divider>
      </div>
      <a-table :columns="columns" :data-source="list" :pagination="false" bordered :scroll="{ x: 'max-content' }">
        <template #actions="record">
          <span v-only-member>无权限</span>
          <a href="javascript:;" @click="update(record)" v-only-admin>编辑</a>
          &nbsp;
          <a href="javascript:;" @click="remove(record)" v-only-admin>删除</a>
        </template>
      </a-table>
      <flex-end style="margin-top: 22px;" v-if="!simple">
        <a-pagination v-model:current="curPage" :total="total" :page-size="10" @change="setPage"></a-pagination>
      </flex-end>
    </a-card>
    <add-one v-model:show="show" @getList="getList"></add-one>
    <update v-model:show="showUpdateModal" :customer="curEditCustomer" @update="updateCurCustomer"></update>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
