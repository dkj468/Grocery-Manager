export interface Item {
  id: number;
  itemName: string;
  itemQuantity: number;
  itemAmount: number;
  itemUnit: string;
}

export interface previousItem {
  id: number;
  date: Date;
  items: Item[];
  totalAmount: number;
}
