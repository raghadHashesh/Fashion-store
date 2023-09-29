import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { toArray } from 'rxjs';
import { Productrate } from '../../products.module';
import { product } from '../../models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  id: any;
  data: any = {};
  count!: number;
  rate: any = [];
  rating!: number;
  notRate: any = [];
  stars: number[] = [1, 2, 3, 4, 5];
  loading: boolean = false;
  constructor(private route: ActivatedRoute, private service: ProductsService) {
    this.id = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.getProduct();
    this.ProductsCount();
  }

  getProduct() {
    this.loading = true;
    this.service.getProductById(this.id).subscribe(res => {
      this.data = res;
      this.rating = this.data.rating.rate;
      console.log(Math.round(this.rating))
      this.rate = Array(Math.round(this.rating)).fill(0);
      let unRate = 5 - Math.round(this.rating);
      this.notRate = Array(unRate).fill(0);
      this.loading = false;
    }, error => {
      this.loading = false;
      alert(error.message);
    }

    )
  }
  ProductsCount() {
    if ("cart" in localStorage) {
      this.count = JSON.parse(localStorage.getItem('cart')!).length;
      this.service.raiseData(this.count);
    }
  }
}

