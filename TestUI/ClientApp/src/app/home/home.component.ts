import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import jsPDF from 'jspdf';

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
  finalTotalShoes = 0;
  latest: string = "";
  comparePrice = 0;
  totalAsset = 0;
  mostExpensive = "";
  highestStock = "";
  topBrand = "";
  constructor(private http: HttpClient) {
    this.getAllItem();
  }

  ngOnInit(): void {
  }

  getAllItem() {

    this.http.get("https://localhost:7206/api/Item/GetItem")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;


        this.ItemArray = resultData;
      
        //For Total Shoes
        //For total asset 
        let totalShoes = 0;
        let asset = 0;
        for (let i = 0; i < this.ItemArray.length; i++) {
          totalShoes += this.ItemArray[i].quantity;
          asset += this.ItemArray[i].quantity * this.ItemArray[i].price;
        }
        this.finalTotalShoes = totalShoes;
        this.totalAsset = asset;
        // For latestt shoes Added 
        this.latest = this.ItemArray[this.ItemArray.length - 1].image;


        //For Most Expensive 
        let compare = this.ItemArray[0].price;
        let temp = "";

        let compare2 = this.ItemArray[0].price;
        let temp2 = "";
        let temp3 = "";
        for (let x = 0; x < this.ItemArray.length; x++) {

          if (this.ItemArray[x].price > compare) {
            compare = this.ItemArray[x].price;
            temp = this.ItemArray[x].image;
            compare = this.ItemArray[x].price;
          }
          this.mostExpensive = temp;

          if (this.ItemArray[x].quantity > compare2) {
            compare2 = this.ItemArray[x].quantity;
            temp2 = this.ItemArray[x].image;
            temp3 = this.ItemArray[x].brand;

          }
          this.highestStock = temp2;
          this.topBrand = temp3;

        }
       
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
