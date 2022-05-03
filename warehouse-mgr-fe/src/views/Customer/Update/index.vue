<template>
  <div>
    <a-modal title="编辑客户" :visible="props.show" @ok="submit" @cancel="close">
      <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
        <a-form-item label="客户名">
          <a-input v-model:value="editForm.name" />
        </a-form-item>
      </a-form>
      <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
        <a-form-item label="负责人">
          <a-input v-model:value="editForm.principal" />
        </a-form-item>
      </a-form>
      <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
        <a-form-item label="联系方式">
          <a-input v-model:value="editForm.contact" />
        </a-form-item>
      </a-form>
      <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
        <a-form-item label="地址">
          <a-input v-model:value="editForm.address" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>
