import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-productcomponent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productcomponent.component.html',
  styleUrls: ['./productcomponent.component.css'],
})
export class ProductcomponentComponent implements OnInit {
  selectedValue = '0';
  quantityValue: number = 1;
  quantityTotal: number = 0;
  Total: number = 0;
  id: any;
  products: any[] = [];
  currentOrder: any = { items: [] };

  formatDateString(isoString:any) { //This is order date formater
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.apiService.getOrderById(this.id).subscribe((data: any) => {
        this.currentOrder = data.order;
        this.calculateTotal();
      });
      this.apiService.getProducts().subscribe((data) => {
        this.products = data.product;
      });
    });
  }

  handleChange(event: Event, item: any,i:any): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedProduct = this.products.find(p => p.price == selectElement.value);
    if (selectedProduct) {
      item.unitPrice = selectedProduct.price;
      item.itemName = selectedProduct.name;
    }
    this.calculateTotal();
  }

  handleQuantityChange(event: Event, item: any): void {
    const inputElement = event.target as HTMLInputElement;
    let value = +inputElement.value; // Convert input value to number
  
    // Check if value is not a number or less than 1
    if (isNaN(value) || value < 1) {
      value = 1; // Set default value to 1 if input is not a valid number or is less than 1
      inputElement.value = '1'; // Update the input field to show the corrected value
    }
  
    item.quantity = value;
    this.calculateTotal();
  }
  
  calculateTotal(): void {
    this.currentOrder.orderAmount = this.currentOrder.items.reduce((total: number, item: any) => {
      return total + (item.unitPrice * item.quantity);
    }, 0);
  }
  handleAddItem () {
    let item = {
      itemName: "",
      unitPrice: 0,
      quantity: 1,
      amount: 0
  }
  this.currentOrder.items = [...this.currentOrder.items, item]
  }

  removeItem(i:number) {
     let newArray = [...this.currentOrder.items]
     newArray.splice(i, 1)
     this.currentOrder.items = [...newArray]
     this.currentOrder.orderAmount = newArray.reduce((total: number, item: any) => {
      return total + (item.unitPrice * item.quantity);
    }, 0);

     console.log(newArray)
  }
  handleSave(orderId: string): void {
    let data = {
      orderAmount: this.currentOrder.orderAmount,
      customerName: this.currentOrder.customerName,
      items: this.currentOrder.items,
    };
    this.apiService.updateOrder(orderId, data).subscribe((data) => {
      console.log(data);
      this.router.navigate(['']);
    });
  }

  navOrder() {
    this.router.navigate(['']);
  }
}
