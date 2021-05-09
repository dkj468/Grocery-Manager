import { Component, OnDestroy, OnInit } from '@angular/core';
import { ObjectId } from 'mongoose';
import { Subscription } from 'rxjs';
import { PreviousItemService } from 'src/app/services/previousItems.service';
import { previousItem } from '../item.model';

@Component({
  selector: 'app-previous-list',
  templateUrl: './previous-list.component.html',
  styleUrls: ['./previous-list.component.css'],
})
export class PreviousListComponent implements OnInit, OnDestroy {
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
  private previousItemSub: Subscription;

  constructor(public previousItemService: PreviousItemService) {}

  ngOnInit() {
    this.previousItemSub = this.previousItemService
      .get()
      .subscribe((response) => {
        this.previousItems = response.data;
      });
  }

  ngOnDestroy() {
    this.previousItemSub.unsubscribe();
  }

  onCopy(previousListId: ObjectId) {
    if (confirm(`Do you want to copy this list's item into current list ?`)) {
      this.previousItemService.copyItemToCurrentList(previousListId);
    }
  }
}
