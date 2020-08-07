import createID from '@/lib/createID';

const model: TagModel = {
  tagData: [] as Tag[],
  fetch() {
    this.tagData = JSON.parse(window.localStorage.getItem('tagList') || '[]');
    return this.tagData;
  },
  create(name) {
    const names = this.tagData.map(item => item.name);
    if (names.indexOf(name) >= 0) {
      window.alert("该标签已存在");
      return 'duplicated';
    }
    const id = createID().toString();
    this.tagData.push({ id: id, name: name });
    this.save();
    return 'success';
  },
  save() {
    window.localStorage.setItem('tagList', JSON.stringify(this.tagData));
  },
  update(id, name) {
    const idList = this.tagData.map(item => item.id)
    if (idList.indexOf(id) >= 0) {
      const tag = this.tagData.filter(item => item.id === id)[0];
      tag.name = name;
      this.save();
      return 'success';
    }
  },
  remove(id: string) {
    let index = -1;
    for (let i = 0; i < this.tagData.length; i++) {
      if (this.tagData[i].id === id) {
        index = i;
        this.tagData.splice(index, 1);
        break;
      }
    }
    this.save();
    return true;
  }
};
export default model;
