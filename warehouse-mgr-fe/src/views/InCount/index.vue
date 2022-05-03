<template>
  <div>
    <a-card>
      <h2>入库单列表</h2>
      <a-divider></a-divider>
      <space-between>
        <div class="search">
          <a-input-search placeholder="根据商品名搜索" enter-button v-model:value="keyword" @search="onSearch" />
          <a v-if="isSearch" href="javascript:;" @click="backAll">返回</a>
        </div>
        <a-button @click="show = true" v-only-admin>添加入库单</a-button>
      </space-between>
      <a-divider></a-divider>
      <a-table :columns="columns" :data-source="list" :pagination="false" bordered>
        <template #supplier="{ record }">
          {{ getSupplierNameById(record.supplier) }}
        </template>
        <template #warehouse="{ record }">
          {{ getWarehouseNameById(record.warehouse) }}
        </template>
        <template #actions="record">
          <a href="javascript:;" @click="updateCount(record)" v-show="record.record.status === 0">入库</a>
          <span v-show="record.record.status === 1">已入库</span>
          &nbsp;
          <a href="javascript:;" @click="update(record)" v-show="record.record.status === 0" v-only-admin>编辑</a>
          &nbsp;
          <a href="javascript:;" @click="remove(record)" v-only-admin>删除</a>
        </template>
      </a-table>
      <flex-end style="margin-top: 22px;">
        <a-pagination v-model:current="curPage" :total="total" :page-size="10" @change="setPage"></a-pagination>
      </flex-end>
    </a-card>
    <add-one v-model:show="show" @getList="getList"></add-one>
    <update v-model:show="showUpdateModal" :inCount="curEditInCount" @update="updateCurInCount"></update>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
