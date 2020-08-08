type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createAt?: Date;
};
type Tag = {
  id: string;
  name: string;
};
// type TagModel = {
//   tagData: Tag[];
//   fetch: () => Tag[];
//   create: (name: string) => 'success' | 'duplicated';
//   save: () => void;
//   update: (id: string, name: string) => 'success' | undefined;
//   remove: (id: string) => boolean;
// };

// interface Window {

// }