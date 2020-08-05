type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number; // 数据类型 object | string

}
const model = {
  data: [] as Record[],
  clone(data: Record[] | Record) {
    return JSON.parse(JSON.stringify(data));
  },
  fetch() {
    return JSON.parse(window.localStorage.getItem('recordList') || '[]') as Record[];
  },
  save() {
    window.localStorage.setItem('recordList', JSON.stringify(this.data));
  },
  create(record: Record) {
    this.data.push(this.clone(record));
  }
};

export default model;  