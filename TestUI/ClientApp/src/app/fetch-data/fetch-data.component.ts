import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {

  ItemArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  item_name: string = "";
  item_brand: string = "";
  item_price = "";
  item_quantity = "";
  item_image = "";
  item_currentID = "";
  isEditing: boolean = false;

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
    const filePath = this.item_image;
    const fileName = filePath?.split('\\').pop() || '';

    const bodyData = {
      "name": this.item_name,
      "brand": this.item_brand,
      "price": this.item_price,
      "quantity": this.item_quantity,
      "image": fileName
    };

    // Add code to register `bodyData` in the database
  
  /*
  register() {

    let bodyData = {
      "name": this.item_name,
      "brand": this.item_brand,
      "price": this.item_price,
      "quantity": this.item_quantity,
      "image":this.item_image

    };*/

    this.http.post("https://localhost:7206/api/Item/AddItem", bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Shoes is succesfully added")
      this.getAllItem();

    });

    this.clear();
  }

  setUpdate(data: any) {

    this.isEditing = true;
    this.item_name = data.name;
    this.item_brand = data.brand;
    this.item_price = data.price;
    this.item_quantity = data.quantity;
    this.item_currentID = data.id;

    this.item_image = data.image;
    

  }

  UpdateRecords() {

    const filePath = this.item_image;
    console.log(filePath);
    const fileName = filePath?.split('\\').pop() || '';

    let bodyData =
    {


      "id": this.item_currentID,
      "name": this.item_name,
      "brand": this.item_brand,
      "price": this.item_price,
      "quantity": this.item_quantity,
      "image": fileName
    };

    this.http.patch("https://localhost:7206/api/Item/UpdateItem" + "/" + this.item_currentID, bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Shoes has been updated")
      this.getAllItem();

    });

    this.clear();
    this.isEditing = false;

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
      alert("Shoes has been deleted")
      this.getAllItem();
    });
  }

  handleFileInput(event: any) {
    const files = event.target?.files;
    if (files && files.length > 0) {
      const file = files.item(0);
      const filePath = event.target?.value;
      const fileName = filePath?.split('\\').pop() || file.name;
      console.log(fileName); // Output: 3.png
    }
  }

  clear() {
    // code to save the data
    this.item_name = '';
    this.item_brand = '';
    this.item_price = '';
    this.item_quantity = '';
    this.item_image = '';
  }

 
}
