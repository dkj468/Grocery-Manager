import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ObjectId } from "mongoose";
import { Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { Item, previousItem } from "../content/item.model";
import { ItemService } from "./item.service";

@Injectable({ providedIn: "root" })
export class PreviousItemService {
  private previousList: previousItem[] = [];
  previousListUpdate = new Subject<previousItem[]>();

  constructor(public itemService: ItemService, public httpClient: HttpClient) {}

  getPreviousListUpdateListener() {
    return this.previousListUpdate.asObservable();
  }

  add(date: Date, items: Item[], totalAmount: number) {
    this.httpClient
      .post("http://127.0.0.1:3000/api/v1/previousItem", {
        date,
        amount: totalAmount,
        items,
      })
      .subscribe((response: any) => {
        console.log(response.data);
        this.previousList.push(response.data);
        this.previousListUpdate.next([...this.previousList]);
      });
  }

  get() {
    return this.httpClient
      .get("http://127.0.0.1:3000/api/v1/previousItem")
      .pipe(
        tap((response: any) => {
          this.previousList = response.data;
        })
      );
  }

  copyItemToCurrentList(thisListId: ObjectId) {
    const thisEntry = this.previousList.find((el) => el._id === thisListId);
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
