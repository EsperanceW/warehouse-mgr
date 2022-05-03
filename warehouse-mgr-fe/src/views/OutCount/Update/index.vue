<template>
  <div>
    <a-modal title="编辑出库单" :visible="props.show" @ok="submit" @cancel="close">
      <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
        <a-form-item label="商品名">
          <a-select v-model:value="editForm.goodsName" style="width: 200px;">
            <a-select-option v-for="item in store.goodsList" :key="item._id" :value="item.name">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="商品编号">
          <a-select v-model:value="editForm.goodsId" style="width: 300px;">
            <a-select-option v-for="item in store.goodsList" :key="item.newId" :value="item.newId">
              {{ item.newId }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="供应商">
          <a-select v-model:value="editForm.supplier" style="width: 300px;">
            <a-select-option v-for="item in store.supplierList" :key="item.newId" :value="item.newId">
              {{ getSupplierNameById(item.newId) }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="出库仓库">
          <a-select v-model:value="editForm.warehouse" style="width: 300px;">
            <a-select-option v-for="item in store.warehouseList" :key="item.newId" :value="item.newId">
              {{ getWarehouseNameById(item.newId) }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="出库数量">
          <a-input-number v-model:value="editForm.count" :min="0" :max="9999999999999" />
        </a-form-item>
        <a-form-item label="客户">
          <a-select v-model:value="editForm.customer" style="width: 300px;">
            <a-select-option v-for="item in store.customerList" :key="item.newId" :value="item.newId">
              {{ getCustomerNameById(item.newId) }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="备注">
          <a-input v-model:value="editForm.remark" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>
