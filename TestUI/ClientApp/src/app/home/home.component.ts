import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  ItemArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  item_name: string = "";
  item_brand: string = "";
  item_price = "";
  item_quantity = "";
  item_currentID = "";

  constructor(private http: HttpClient) {
    this.getAllItem();
  }

  ngOnInit(): void {
  }

  getAllItem() {

    this.http.get("https://localhost:7206/api/Item/GetItem")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData);
        this.ItemArray = resultData;
        console.log(this.ItemArray.length)
        let total = this.ItemArray.length;
      });
  }

  register() {

    let bodyData = {
      "name": this.item_name,
      "brand": this.item_brand,
      "price": this.item_price,
      "quantity": this.item_quantity

    };

    this.http.post("https://localhost:7206/api/Item/AddItem", bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Item Added Successfully")
      this.getAllItem();

    });
  }

  setUpdate(data: any) {
    this.item_name = data.name;
    this.item_brand = data.brand;
    this.item_price = data.price;
    this.item_quantity = data.quantity;
    this.item_currentID = data.id;
  }

  UpdateRecords() {
    let bodyData =
    {
      "id": this.item_currentID,
      "name": this.item_name,
      "brand": this.item_brand,
      "price": this.item_price,
      "quantity": this.item_quantity
    };

    this.http.patch("https://localhost:7206/api/Item/UpdateItem" + "/" + this.item_currentID, bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Item Updated")
      this.getAllItem();

    });
  }
  save() {
    if (this.item_currentID == '') {
      this.register();
    }
    else {
      this.UpdateRecords();
    }

  }


  setDelete(data: any) {
    this.http.delete("https://localhost:7206/api/Item/DeleteItem" + "/" + data.id).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Item Deleted")
      this.getAllItem();
    });
  }

}