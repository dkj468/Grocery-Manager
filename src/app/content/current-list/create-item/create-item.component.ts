import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ItemService } from "src/app/services/item.service";

@Component({
  selector: "app-create-item",
  templateUrl: "./create-item.component.html",
  styleUrls: ["./create-item.component.css"],
})
export class CreateItemComponent {
  constructor(public itemService: ItemService) {}

  onCreateItem(itemForm: NgForm) {
    if (itemForm.invalid) {
      return;
    }
    this.itemService.addItem(
      itemForm.value.itemName,
      itemForm.value.itemQuantity,
      itemForm.value.itemUnit,
      itemForm.value.itemAmount
    );
    itemForm.resetForm();
  }
}
