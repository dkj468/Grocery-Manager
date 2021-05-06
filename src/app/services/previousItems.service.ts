import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Item, previousItem } from "../content/item.model";
import { ItemService } from "./item.service";

@Injectable({ providedIn: "root" })
export class PreviousItemService {
  private previousList: previousItem[] = [];
  previousListUpdate = new Subject<previousItem[]>();

  constructor(public itemService: ItemService) {}

  getPreviousListUpdateListener() {
    return this.previousListUpdate.asObservable();
  }

  add(date: Date, items: Item[], totalAmount: number) {
    let id = 1;
    if (this.previousList.length > 0) {
      id = this.previousList[this.previousList.length - 1].id + 1;
    }
    const previousEntry: previousItem = { id, date, items, totalAmount };
    this.previousList.push(previousEntry);
    this.previousListUpdate.next([...this.previousList]);
  }

  get() {
    return [...this.previousList];
  }

  copyItemToCurrentList(thisListId: number) {
    const thisEntry = this.previousList.find((el) => el.id === thisListId);
    if (thisEntry) {
      thisEntry.items.forEach((item: Item) => {
        this.itemService.addItem(
          item.name,
          item.quantity,
          item.unit,
          item.amount,
          false
        );
      });
    }
  }
}
