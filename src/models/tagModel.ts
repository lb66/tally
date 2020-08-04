type Tag = {
  id: string;
  name: string;
}
type TagModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => 'success' | 'duplicated';
  save: () => void;
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
}
const model: TagModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem('tagList') || '[]');
    return this.data;
  },
  create(name) {
    const names = this.data.map(item => item.name)
    if (names.indexOf(name) >= 0) { return 'duplicated'; }
    this.data.push({ id: name, name: name });
    this.save();
    return 'success';
  },
  save() {
    window.localStorage.setItem('tagList', JSON.stringify(this.data));
  },
  update(id, name) {
    const idList = this.data.map(item => item.id)
    if (idList.indexOf(id) >= 0) {
      const names = this.data.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        const tag = this.data.filter(item => item.id === id)[0];
        tag.name = name;
        this.save();
        return 'success';
      }
    } else {
      return 'not found';
    }
  }
};
export default model;
