import { Component } from '@angular/core';
import { ProductsService } from '../products/services/products.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {
  count!: number;

  constructor(private service: ProductsService) { }

  ngOnInit() {
    this.ProductsCount();
  }

  ProductsCount() {
    if ("cart" in localStorage) {
      this.count = JSON.parse(localStorage.getItem('cart')!).length;
      this.service.raiseData(this.count);
    }
  }
}
