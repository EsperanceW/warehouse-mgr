<template>
  <div>
    <a-spin :spinning="loading">
      <a-card>
        <div class="list">
          <div class="item">
            <div class="count">共 {{ baseInfo.total.goods }} 种</div>
            <div class="title">商品</div>
          </div>
          <div class="item">
            <div class="count">共 {{ baseInfo.total.user }} 位</div>
            <div class="title">用户</div>
          </div>
          <div class="item">
            <div class="count">共 {{ baseInfo.total.supplier }} 家</div>
            <div class="title">供应商</div>
          </div>
          <div class="item">
            <div class="count">共 {{ baseInfo.total.inCount }} 条</div>
            <div class="title">入库单</div>
          </div>
          <div class="item">
            <div class="count">共 {{ baseInfo.total.outCount }} 条</div>
            <div class="title">出库单</div>
          </div>
          <div class="item" v-only-admin>
            <div class="count">共 {{ baseInfo.total.log }} 条</div>
            <div class="title">日志</div>
          </div>
        </div>
      </a-card>
    </a-spin>
    <div class="table-list">
      <div class="left">
        <goods simple />
      </div>
      <div class="right">
        <supplier simple />
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
