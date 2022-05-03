<template>
  <div>
    <a-card>
      <space-between>
        <h2>{{ d.name }}</h2>
        <div v-only-admin>
          <a-button size="small" type="primary" @click="showUpdateModal = true">编辑</a-button>
          &nbsp;
          <a-button size="small" type="danger" @click="remove">删除</a-button>
        </div>
      </space-between>
      <a-divider />
      <div class="base-info">
        <div class="items">
          <div class="item">
            <div class="title">价格</div>
            <div class="content">{{ d.price }}</div>
          </div>
          <div class="item">
            <div class="title">供应商</div>
            <div class="content">{{ getSupplierNameById(d.supplier) }}</div>
          </div>
          <div class="item">
            <div class="title">分类</div>
            <div class="content">{{ getClassifyTitleById(d.classify) }}</div>
          </div>
        </div>
        <div class="items">
          <div class="item">
            <div class="title">上市日期</div>
            <div class="content">{{ formatTimestamp(d.launchDate) }}</div>
          </div>
          <div class="item">
            <div class="title">规格</div>
            <div class="content">{{ d.specification }}</div>
          </div>
          <div class="item">
            <div class="title">单位</div>
            <div class="content">{{ d.unit }}</div>
          </div>
        </div>
      </div>
    </a-card>
    <div class="inventory">
      <a-card title="库存详情">
        <div>
          <a-table :data-source="detail" :columns="inventoryDetailInfo" :pagination="false" bordered></a-table>
        </div>
        <space-between style="margin-top: 22px;">
          <div></div>
          <a-pagination v-model:current="detailCurPage" :total="detailTotal" :page-size="5" @change="setDetailPage" />
        </space-between>
      </a-card>
    </div>
    <div class="log">
      <a-card title="出入库日志">
        <template #extra>
          <span>
            <a href="javascript:;" @click="logFilter('IN_COUNT')">
              <CheckOutlined v-if="curLogType === 'IN_COUNT'" />
              入库日志
            </a>
          </span>
          <span style="margin-left: 12px;">
            <a href="javascript:;" @click="logFilter('OUT_COUNT')">
              <CheckOutlined v-if="curLogType === 'OUT_COUNT'" />
              出库日志
            </a>
          </span>
        </template>
        <div>
          <a-table :data-source="log" :columns="columns" :pagination="false" bordered>
            <template #createdAt="{ record }">
              {{ formatTimestamp(record.meta.createdAt) }}
            </template>
          </a-table>
        </div>
        <space-between style="margin-top: 22px;">
          <div></div>
          <a-pagination v-model:current="logCurPage" :total="logTotal" :page-size="5" @change="setLogPage" />
        </space-between>
      </a-card>
    </div>
    <update v-model:show="showUpdateModal" :goods="d" @update="update" />
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
