import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { product } from '../../models/product';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  products: product[] = [];
  categories: string[] = [];
  cartProducts: any[] = [];
  loading: boolean = false;
  count: number = 0;
  images = [
    { url: '../../../../assets/images/pic.jpg', alt: 'Image 1', caption: 'Caption 1' },
    { url: '../../../../assets/images/sal.jpg', alt: 'Image 2', caption: 'Caption 2' },
    { url: '../../../../assets/images/jew.jpg', alt: 'Image 3', caption: 'Caption 3' },
  ];
  carouselOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    items: 1,
    nav: true,
    dots: true,
    dotsEach: true
  };

  constructor(private service: ProductsService, private _snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.ProductsCount();
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  getProducts() {
    this.loading = true;
    this.service.getAllProducts().subscribe((res: any) => {

      this.products = res;
      this.loading = false;
    },
      error => {
        this.openSnackBar("Error connection try again", "cancle")
        this.loading = false;
      }
    );
  }
  getCategories() {
    this.loading = true;
    this.service.getAllCateories().subscribe(res => {
      this.categories = res;
      this.loading = false;
    },
      error => {
        this.openSnackBar("Error connection try again", "cancle")
        this.loading = false;
      }
    );
  }

  filterCategory(event: any) {
    let value = event.target.value;
    if (value === 'All') {
      this.getProducts();
    }
    else {
      this.getPoductsCategory(value);
    }
  }
  getPoductsCategory(word: string) {
    this.loading = true;
    this.service.getProductsByCategory(word).subscribe((res: any) => {
      this.products = res;
      this.loading = false;
    })
  }


  addToCart(event: any) {
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartProducts.find(i => i.item.id == event.item.id);
      if (exist) {
        this.openSnackBar("product is already in your cart", "cancle")
      }
      else {
        this.cartProducts.push(event);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
        this.ProductsCount();
      }
    }
    else {
      this.cartProducts.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      this.ProductsCount();
    }
  }

  ProductsCount() {
    if ("cart" in localStorage) {
      this.count = JSON.parse(localStorage.getItem('cart')!).length;
      this.service.raiseData(this.count);
    }
  }

}
