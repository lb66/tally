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
interface Window {
  tagList: Tag[];
}