import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectId } from 'mongoose';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Item } from '../models/item.model';

@Injectable({ providedIn: 'root' })
export class ItemService {
  private items: Item[] = [];
  private itemsUpdate = new Subject<Item[]>();

  constructor(public httpClient: HttpClient) {}

  getItems() {
    return this.httpClient.get('http://127.0.0.1:3000/api/v1/item').pipe(
      tap((response: any) => {
        this.items = response.data;
      })
    );
  }

  onItemsUpdateListener() {
    return this.itemsUpdate.asObservable();
  }

  addItem(
    itemName: string,
    itemQuantity: number,
    itemUnit: string,
    itemAmount: number,
    bNotifyUpdate: boolean = true
  ) {
    this.httpClient
      .post('http://127.0.0.1:3000/api/v1/item', {
        name: itemName,
        quantity: itemQuantity,
        unit: itemUnit,
        amount: itemAmount,
      })
      .subscribe((response: any) => {
        this.items.push(response.data);
        if (bNotifyUpdate) {
          this.itemsUpdate.next([...this.items]);
        }
      });
  }

  deleteItem(itemID: ObjectId) {
    this.httpClient
      .delete(`http://127.0.0.1:3000/api/v1/item/${itemID}`)
      .subscribe((response) => {
        console.log(this.items);
        const itemIndex = this.items.findIndex((el) => el._id === itemID);
        if (itemIndex >= 0) {
          this.items.splice(itemIndex, 1);
          this.itemsUpdate.next([...this.items]);
        }
      });
  }

  updateItemAmount(amount: number, itemID: ObjectId) {
    const itemIndex = this.items.findIndex((el) => el._id === itemID);
    if (itemIndex >= 0) {
      this.items[itemIndex].amount = amount;
      this.itemsUpdate.next([...this.items]);
    }
  }

  getTotalAmount() {
    let totalAmount = 0;
    this.items.forEach((el) => (totalAmount += el.amount * 1));
    return totalAmount;
  }

  resetList() {
    this.items.length = 0;
    this.itemsUpdate.next([...this.items]);
  }
}
