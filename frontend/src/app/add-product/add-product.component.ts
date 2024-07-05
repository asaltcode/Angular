import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  constructor(private router: Router, private apiService: ApiService){}
   newProduct:any = {name: "hi", price: 0}
   creatProduct () {
      this.apiService.addProduct(this.newProduct)
   }
   navOrder(){
    this.router.navigate(["items"])
   }
}
