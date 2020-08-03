type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number; // 数据类型 object | string
  createdAt?: Date;  // 类 / 构造函数
}
const model = {
  clone(data: Record[] | Record) {
    return JSON.parse(JSON.stringify(data));
  },
  fetch() {
    return JSON.parse(window.localStorage.getItem('recordList') || '[]') as Record[];
  },
  save(data: Record[]) {
    window.localStorage.setItem('recordList', JSON.stringify(data));
  }
};

export default model;  