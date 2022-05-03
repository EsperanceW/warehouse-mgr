<template>
  <div>
    <a-card>
      <div>
        <h2>库存详情</h2>
        <a-divider></a-divider>
        <space-between>
          <div class="search">
            <a-input-search placeholder="根据商品名搜索" enter-button v-model:value="keyword" @search="onSearch" />
            <a v-show="isSearch" href="javascript:;" @click="backAll">返回</a>
          </div>
        </space-between>
        <a-divider></a-divider>
      </div>
      <a-table :columns="columns" :data-source="detail" :pagination="false" bordered :scroll="{ x: 'max-content' }">
        <template #actions="record">
          <span v-only-member>无权限</span>
          <a href="javascript:;" @click="remove(record)" v-only-admin>删除</a>
        </template>
      </a-table>
      <flex-end style="margin-top: 22px;">
        <a-pagination v-model:current="detailCurPage" :total="detailTotal" :page-size="10" @change="setDetailPage"></a-pagination>
      </flex-end>
    </a-card>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
