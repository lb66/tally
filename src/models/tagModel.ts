import createID from '@/lib/createID';

type Tag = {
  id: string;
  name: string;
}
type TagModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => 'success' | 'duplicated';
  save: () => void;
  update: (id: string, name: string) => 'success' | undefined;
  remove: (id: string) => boolean;
}
const model: TagModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem('tagList') || '[]');
    return this.data;
  },
  create(name) {
    const names = this.data.map(item => item.name);
    if (names.indexOf(name) >= 0) { return 'duplicated'; }
    const id = createID().toString();
    this.data.push({ id: id, name: name });
    this.save();
    return 'success';
  },
  save() {
    window.localStorage.setItem('tagList', JSON.stringify(this.data));
  },
  update(id, name) {
    const idList = this.data.map(item => item.id)
    if (idList.indexOf(id) >= 0) {
      const tag = this.data.filter(item => item.id === id)[0];
      tag.name = name;
      this.save();
      return 'success';
    }
  },
  remove(id: string) {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        index = i;
        this.data.splice(index, 1);
        break;
      }
    }
    this.save();
    return true;
  }
};
export default model;
