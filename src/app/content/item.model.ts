import { ObjectId } from "mongoose";

export interface Item {
  _id: ObjectId;
  name: string;
  quantity: number;
  unit: string;
  amount: number;
}

export interface previousItem {
  id: number;
  date: Date;
  items: Item[];
  totalAmount: number;
}
