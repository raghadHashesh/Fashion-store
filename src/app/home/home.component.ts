import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProductsService } from '../products/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  count!: number;
  constructor(private service: ProductsService) { }
  ngOnInit() {
    this.ProductsCount();
  }

  index: number = 1;
  head = "Let's Shop together....";
  ProductsCount() {
    if ("cart" in localStorage) {
      this.count = JSON.parse(localStorage.getItem('cart')!).length;
      this.service.raiseData(this.count);
    }
  }
}
