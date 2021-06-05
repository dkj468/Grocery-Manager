import { ObjectId } from 'mongoose';

export interface Item {
  _id: ObjectId;
  name: string;
  quantity: number;
  unit: string;
  amount: number;
}

export interface previousItem {
  _id: ObjectId;
  date: Date;
  items: Item[];
  amount: number;
}
