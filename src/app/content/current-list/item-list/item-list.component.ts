import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';
import { Item } from '../../item.model';

@Component({
  selector:'app-item-list',
  templateUrl:'./item-list.component.html',
  styleUrls:['./item-list.component.css']
})

export class ItemListComponent implements OnInit, OnDestroy{

  private itemsUpdate: Subscription;
  itemAmount: number = 0;
  totalAmount = 0;

  // items: Item[] = [{
  //   id:1, itemName:'Rice', itemQuantity: 2, itemUnit: 'Kg'}];
  items: Item[] = [{
    id:1, itemName:'Rice', itemQuantity:2, itemUnit:'Kg', itemAmount: 230
  },{
    id:2, itemName:'Oil', itemQuantity:2, itemUnit:'ltr', itemAmount: 240
  }];
  constructor(public itemService: ItemService) {

  }

  onDelete(itemID: number){
    console.log(itemID);
    this.itemService.deleteItem(itemID);
  }

  onAmountChange(value: number, itemID: number){
    this.itemService.updateItemAmount(value, itemID);
  }

  ngOnInit(){
    this.itemsUpdate = this.itemService.onItemsUpdateListener()
                .subscribe((items:Item[]) => {
                  this.items = items;
                  this.totalAmount = this.itemService.getTotalAmount();
                });


  }

  ngOnDestroy(){
    this.itemsUpdate.unsubscribe();
  }
}
