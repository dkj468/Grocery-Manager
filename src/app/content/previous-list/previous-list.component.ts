import { Component, OnDestroy, OnInit } from "@angular/core";
import { PreviousItemService } from "src/app/services/previousItems.service";
import { previousItem } from "../item.model";

@Component({
  selector: "app-previous-list",
  templateUrl: "./previous-list.component.html",
  styleUrls: ["./previous-list.component.css"],
})
export class PreviousListComponent implements OnInit {
  previousItems: previousItem[] = [];
  //previousItemSub: Subscription;
  constructor(public previousItemService: PreviousItemService) {}

  ngOnInit() {
    this.previousItems = this.previousItemService.get();
  }
}
