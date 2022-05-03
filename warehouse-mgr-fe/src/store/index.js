import { createStore } from 'vuex';
import { character, goodsClassify, supplier, user, goods, warehouse, customer } from '@/service';
import { getCharacterInfoById } from '@/helpers/character';
import { result } from '@/helpers/utils';

export default createStore({
  state: {
    characterInfo: [],
    userInfo: {},
    userCharacter: {},
    goodsClassify: [],
    supplierList: [],
    goodsList: [],
    warehouseList: [],
    customerList: [],
  },
  getters: {
  },
  mutations: {
    setCharacterInfo(state, characterInfo) {
      state.characterInfo = characterInfo;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    setUserCharacter(state, userCharacter) {
      state.userCharacter = userCharacter;
    },
    setGoodsClassify(state, goodsClassify) {
      state.goodsClassify = goodsClassify;
    },
    setSupplierList(state, supplierList) {
      state.supplierList = supplierList;
    },
    setGoodsList(state, goodsList) {
      state.goodsList = goodsList;
    },
    setWarehouseList(state, warehouseList) {
      state.warehouseList = warehouseList;
    },
    setCustomerList(state, customerList) {
      state.customerList = customerList;
    },
  },
  actions: {
    async getCharacterInfo(store) {
      const res = await character.list();

      result(res)
        .success(({ data }) => {
          store.commit('setCharacterInfo', data);
        });
    },
    async getUserInfo(store) {
      const res = await user.info();

      result(res)
        .success(({ data }) => {
          store.commit('setUserInfo', data);
          store.commit('setUserCharacter', getCharacterInfoById(data.character));
        });
    },
    async getGoodsClassify(store) {
      const res = await goodsClassify.list();

      result(res)
        .success(({ data }) => {
          store.commit('setGoodsClassify', data);
        });
    },
    async getSupplierList(store) {
      const res = await supplier.listAll();

      result(res)
        .success(({ data }) => {
          store.commit('setSupplierList', data);
        });
    },
    async getGoodsList(store) {
      const res = await goods.listAll();

      result(res)
        .success(({ data }) => {
          store.commit('setGoodsList', data);
        });
    },
    async getWarehouseList(store) {
      const res = await warehouse.listAll();

      result(res)
        .success(({ data }) => {
          store.commit('setWarehouseList', data);
        });
    },
    async getCustomerList(store) {
      const res = await customer.listAll();

      result(res)
        .success(({ data }) => {
          store.commit('setCustomerList', data);
        });
    },
  },
  modules: {
  },
});
