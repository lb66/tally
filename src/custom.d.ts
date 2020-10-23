type RecordItem = {
  tags: Tag[];
  notes: string;
  type: string;
  amount: number;
  createAt: string;
};
type Tag = {
  id: string;
  name: string;
};
type RootState = {
  recordList: RecordItem[];
  tagData: Tag[];
  currentTag?: Tag;
};
type keyValueList = {
  key: string;
  value: number;
}[]
// interface Window {

// }