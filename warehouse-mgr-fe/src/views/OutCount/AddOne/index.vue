<template>
  <div>
    <a-modal title="添加出库单" :visible="props.show" @ok="submit" @cancel="close">
      <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
        <a-form-item label="出库单号">
          <a-input v-model:value="addForm.newId" />
        </a-form-item>
        <a-form-item label="商品名">
          <a-select v-model:value="addForm.goodsName" style="width: 200px;">
            <a-select-option v-for="item in store.goodsList" :key="item._id" :value="item.name">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="商品编号">
          <a-select v-model:value="addForm.goodsId" style="width: 300px;">
            <a-select-option v-for="item in store.goodsList" :key="item.newId" :value="item.newId">
              {{ item.newId }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="供应商">
          <a-select v-model:value="addForm.supplier" style="width: 300px;">
            <a-select-option v-for="item in store.supplierList" :key="item.newId" :value="item.newId">
              {{ getSupplierNameById(item.newId) }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="出库仓库">
          <a-select v-model:value="addForm.warehouse" style="width: 300px;">
            <a-select-option v-for="item in store.warehouseList" :key="item.newId" :value="item.newId">
              {{ getWarehouseNameById(item.newId) }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="出库数量">
          <a-input-number v-model:value="addForm.count" :min="0" :max="9999999999999" />
        </a-form-item>
        <a-form-item label="客户">
          <a-select v-model:value="addForm.customer" style="width: 300px;">
            <a-select-option v-for="item in store.customerList" :key="item.newId" :value="item.newId">
              {{ getCustomerNameById(item.newId) }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="备注">
          <a-input v-model:value="addForm.remark" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>
