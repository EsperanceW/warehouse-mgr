<template>
  <div>
    <a-modal title="添加商品" :visible="props.show" @ok="submit" @cancel="close">
      <a-form :label-col="{ span: 6 }">
        <a-form-item label="商品名">
          <a-input v-model:value="addForm.name" />
        </a-form-item>
        <a-form-item label="价格">
          <a-input-number v-model:value="addForm.price" :min="0" :max="9999999999999" />
        </a-form-item>
        <a-form-item label="供应商">
          <a-input v-model:value="addForm.supplier" />
        </a-form-item>
        <a-form-item label="上市日期">
          <a-date-picker v-model:value="addForm.launchDate" />
        </a-form-item>
        <a-form-item label="分类">
          <a-input v-model:value="addForm.classify" />
        </a-form-item>
        <a-form-item label="库存">
          <a-input v-model:value="addForm.count" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>

