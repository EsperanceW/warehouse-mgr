<template>
  <div>
    <a-modal title="添加商品" :visible="props.show" @ok="submit" @cancel="close">
      <a-form :label-col="{ span: 6 }">
        <a-form-item label="商品编号">
          <a-input v-model:value="addForm.newId" />
        </a-form-item>
        <a-form-item label="商品名">
          <a-input v-model:value="addForm.name" />
        </a-form-item>
        <a-form-item label="供应商">
          <a-select v-model:value="addForm.supplier" style="width: 120px;">
            <a-select-option v-for="item in store.supplierList" :key="item.newId" :value="item.newId">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="价格">
          <a-input-number v-model:value="addForm.price" :min="0" :max="9999999999999" />
        </a-form-item>
        <a-form-item label="规格">
          <a-input v-model:value="addForm.specification" />
        </a-form-item>
        <a-form-item label="上市日期">
          <a-date-picker v-model:value="addForm.launchDate" />
        </a-form-item>
        <a-form-item label="分类">
          <a-select v-model:value="addForm.classify" style="width: 120px;">
            <a-select-option v-for="item in store.goodsClassify" :key="item._id" :value="item._id">
              {{ item.title }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <!-- <a-form-item label="库存">
          <a-input v-model:value="addForm.count" />
        </a-form-item> -->
        <a-form-item label="单位">
          <a-input v-model:value="addForm.unit" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>

