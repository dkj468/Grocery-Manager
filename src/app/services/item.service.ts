import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Item } from "../content/item.model";

@Injectable({ providedIn: "root" })
export class ItemService {
  private items: Item[] = [];
  private itemsUpdate = new Subject<Item[]>();

  getItems() {
    return [...this.items];
  }

  onItemsUpdateListener() {
    return this.itemsUpdate.asObservable();
  }

  addItem(
    itemName: string,
    itemQuantity: number,
    itemUnit: string,
    itemAmount: number
  ) {
    let id = 1;
    if (this.items.length > 0) {
      id = this.items[this.items.length - 1].id + 1;
    }
    const item: Item = {
      id: id,
      itemName: itemName,
      itemQuantity: itemQuantity,
      itemUnit: itemUnit,
      itemAmount: itemAmount,
    };
    this.items.push(item);
    this.itemsUpdate.next([...this.items]);
  }

  deleteItem(itemID: number) {
    const itemIndex = this.items.findIndex((el) => el.id === itemID);
    if (itemIndex >= 0) {
      this.items.splice(itemIndex, 1);
      this.itemsUpdate.next([...this.items]);
    }
  }

  updateItemAmount(amount: number, itemID: number) {
    const itemIndex = this.items.findIndex((el) => el.id === itemID);
    if (itemIndex >= 0) {
      this.items[itemIndex].itemAmount = amount;
      this.itemsUpdate.next([...this.items]);
    }
  }

  getTotalAmount() {
    let totalAmount = 0;
    this.items.forEach((el) => (totalAmount += el.itemAmount * 1));
    return totalAmount;
  }

  resetList() {
    this.items.length = 0;
    this.itemsUpdate.next([...this.items]);
  }
}
