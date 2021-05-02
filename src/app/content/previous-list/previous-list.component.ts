import { Component, OnDestroy, OnInit } from "@angular/core";
import { PreviousItemService } from "src/app/services/previousItems.service";
import { previousItem } from "../item.model";

@Component({
  selector: "app-previous-list",
  templateUrl: "./previous-list.component.html",
  styleUrls: ["./previous-list.component.css"],
})
export class PreviousListComponent implements OnInit {
  // previousItems: previousItem[] = [
  //   {
  //     id: 1,
  //     date: new Date(),
  //     items: [
  //       {
  //         id: 1,
  //         itemName: "Rice",
  //         itemQuantity: 2,
  //         itemUnit: "Kg",
  //         itemAmount: 200,
  //       },
  //     ],
  //     totalAmount: 400,
  //   },
  // ];
  previousItems: previousItem[] = [];
  //previousItemSub: Subscription;
  constructor(public previousItemService: PreviousItemService) {}

  ngOnInit() {
    this.previousItems = this.previousItemService.get();
  }

  onCopy(previousListId: number) {
    if (confirm(`Do you want to copy this list's item into current list ?`)) {
      this.previousItemService.copyItemToCurrentList(previousListId);
    }
  }
}
