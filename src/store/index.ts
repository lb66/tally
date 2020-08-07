import Vue from 'vue'
import Vuex from 'vuex'
import clone from "@/lib/clone";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagData: [] as Tag[],
  },
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    createRecord(state, record) {
      state.recordList.push(clone(record));
      store.commit('saveRecords')
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
  },
})
export default store