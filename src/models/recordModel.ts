type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number; // 数据类型 object | 
}
const model = {
  data: [] as Record[],
  clone(data: Record[] | Record) {
    return JSON.parse(JSON.stringify(data));
  },
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem('recordList') || '[]') as Record[];
    return this.data;
  },
  save() {
    window.localStorage.setItem('recordList', JSON.stringify(this.data));
  },
};

export default model;  