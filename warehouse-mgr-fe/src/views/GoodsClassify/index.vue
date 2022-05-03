<template>
  <div>
    <a-card>
      <h2>商品分类管理</h2>
      <a-divider></a-divider>
      <a-input v-model:value="title" placeholder="请输入商品分类名" style="width: 200px; margin-right: 12px;"></a-input>
      <a-button @click="add" type="primary">添加</a-button>
      <a-divider></a-divider>
      <div>
        <a-table bordered :data-source="list" :columns="columns" :pagination="false">
          <template #actions="{ record }">
            <a-button size="small" @click="updateTitle(record)">编辑</a-button>
            &nbsp;
            <a-button size="small" type="danger" @click="remove(record)">删除</a-button>
          </template>
        </a-table>
      </div>
    </a-card>
  </div>
</template>

<script src="./index.jsx"></script>
