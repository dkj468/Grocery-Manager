import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { Subscription } from "rxjs";
import { ItemService } from "src/app/services/item.service";
import { PreviousItemService } from "src/app/services/previousItems.service";
import { Item } from "../../item.model";

@Component({
  selector: "app-item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.css"],
})
export class ItemListComponent implements OnInit, OnDestroy {
  private itemsUpdate: Subscription;
  itemAmount: number = 0;
  totalAmount = 0;

  // items: Item[] = [
  //   {
  //     id: 1,
  //     itemName: "Rice",
  //     itemQuantity: 2,
  //     itemUnit: "Kg",
  //     itemAmount: 0,
  //   },
  // ];
  items: Item[] = [];
  constructor(
    public itemService: ItemService,
    public previousItemService: PreviousItemService
  ) {}

  onDelete(itemID: number) {
    console.log(itemID);
    this.itemService.deleteItem(itemID);
  }

  onMarkComplete(event: MatCheckboxChange) {
    // TODO -- Need to replace this code with shiny confirmation dialog
    if (
      confirm("Please Note that you will not be able to edit entries later")
    ) {
      this.previousItemService.add(new Date(), this.items, this.totalAmount);
      this.itemService.resetList();
    }
  }

  ngOnInit() {
    console.log("item-list onCreate called");
    this.itemsUpdate = this.itemService
      .onItemsUpdateListener()
      .subscribe((items: Item[]) => {
        this.items = items;
        this.totalAmount = this.itemService.getTotalAmount();
      });

    // when user returns from previous list , subscription does not show data
    if (this.items.length <= 0) {
      this.items = this.itemService.getItems();
      this.totalAmount = this.itemService.getTotalAmount();
    }
  }

  ngOnDestroy() {
    console.log("item-list onDestry called");
    this.itemsUpdate.unsubscribe();
  }
}
