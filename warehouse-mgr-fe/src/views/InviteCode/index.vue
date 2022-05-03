<template>
  <div>
    <a-card>
      <h2>邀请码管理</h2>
      <a-divider></a-divider>
      <div>
        <a-input-number v-model:value="count" :min="1" :max="10000"></a-input-number>
        &nbsp;
        <a-button type="primary" @click="add">添加</a-button>
      </div>
      <a-divider></a-divider>
      <div>
        <a-table bordered :columns="columns" :data-source="list" :pagination="false">
          <template #status="{ record }">
            {{ record.user ? '已使用' : '未使用' }}
          </template>
          <template #actions="{ record }">
            <a-button type="danger" size="small" @click="remove(record)">删除</a-button>
          </template>
        </a-table>
      </div>
      <flex-end style="margin-top: 22px;">
        <a-pagination v-model:current="curPage" :pageSize="10" :total="total" @change="setPage"></a-pagination>
      </flex-end>
    </a-card>
  </div>
</template>

<script src="./index.js"></script>
