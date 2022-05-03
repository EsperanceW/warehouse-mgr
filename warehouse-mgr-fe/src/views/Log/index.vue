<template>
  <div>
    <a-spin :spinning="loading">
      <a-card :title="simple ? '最近的操作日志' : ''">
        <diV v-if="!simple">
          <h2>操作日志</h2>
          <a-divider />
        </diV>
        <div>
          <a-table bordered :columns="columns" :data-source="list" :pagination="false" :scroll="{ x: 'max-content' }">
            <template #createdAt="{ record }">
              {{ formatTimestamp(record.meta.createdAt) }}
            </template>
            <template #action="{ record }" v-if="!simple">
              <a href="javascript:;" @click="remove(record)">删除</a>
            </template>
          </a-table>
        </div>
        <flex-end style="margin-top: 22px;" v-if="!simple">
          <a-pagination v-model:current="curPage" :pageSize="20" :total="total" @change="setPage" />
        </flex-end>
      </a-card>
    </a-spin>
  </div>
</template>

<script src="./index.js"></script>
