export type Item = {
  _id: string;
  quantity: number;
};

export type Invoice = {
    _id: string;
    date: string;
    items: Item[];
};
