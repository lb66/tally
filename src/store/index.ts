import Vue from 'vue'
import Vuex from 'vuex'
import clone from "@/lib/clone";
import createID from '@/lib/createID';
import router from '@/router';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    recordList: [],
    tagData: [],
    currentTag: undefined
  } as RootState,
  mutations: {
    // record 
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    createRecord(state, record) {
      state.recordList.push(clone(record));
      store.commit('saveRecords')
    },
    removeRecord(state,index){
      state.recordList.splice(index,1)
      store.commit('saveRecords')
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    // tag
    fetchTags(state) {
      state.tagData = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if (!state.tagData || state.tagData.length === 0) {
        store.commit('createTag', '吃饭');
        store.commit('createTag', '交通');
        store.commit('createTag', '衣服');
        store.commit('createTag', '其他');
      }
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagData));
    },
    createTag(state, name: string) {
      const names = state.tagData.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert("该标签已存在");
        return;
      }
      const id = createID().toString();
      state.tagData.push({ id: id, name: name });
      store.commit('saveTags');
    },
    selectCurrentTag(state, id: string) {
      state.currentTag = state.tagData.filter(t => t.id === id)[0];
    },
    updateTag(state, payload: { id: string; name: string }) {
      const { id, name } = payload
      const idList = state.tagData.map(item => item.id)
      if (idList.indexOf(id) >= 0) {
        const tag = state.tagData.filter(item => item.id === id)[0];
        tag.name = name;
        store.commit('saveTags');
      }
    },
    removeTag(state, id) {
      let index = -1;
      for (let i = 0; i < state.tagData.length; i++) {
        if (state.tagData[i].id === id) {
          index = i;
          state.tagData.splice(index, 1);
          break;
        }
      }
      if (index >= 0) {
        store.commit('saveTags');
        router.back();
      } else {
        window.alert('删除失败');
      }

    }
  },
})
export default store