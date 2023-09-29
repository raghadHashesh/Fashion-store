import { Component } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartProducts: any[] = [];
  total: any = 0;
  count!: number;

  constructor(private service: CartsService, private _snackBar: MatSnackBar, private productservice: ProductsService) { }

  ngOnInit() {
    this.getCartProducts();
    this.ProductsCount();

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  getCartProducts() {
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
    }
    this.getCartTotal();
  }

  getCartTotal() {
    this.total = 0;
    for (let x in this.cartProducts) {
      this.total += this.cartProducts[x].item.price * this.cartProducts[x].quantity;
    }
  }

  minusAmount(index: number) {
    if (this.cartProducts[index].quantity > 1) {
      this.cartProducts[index].quantity--;
      this.getCartTotal();
    }
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }

  plusAmount(index: number) {
    this.cartProducts[index].quantity++;
    this.getCartTotal();
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }


  detectChange() {
    this.getCartTotal();
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }


  deleteProduct(index: number) {
    console.log(index)
    this.cartProducts.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    this.getCartTotal();
    this.ProductsCount();
  }
  clearCart() {
    this.cartProducts = [];
    this.getCartTotal();
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    this.ProductsCount();
  }

  addCart() {
    let products = this.cartProducts.map(ele => {
      return { productId: ele.item.id, quantity: ele.quantity };
    })

    let Model = {
      userId: 5,
      date: new Date(),
      products: products
    }
    this.service.createNewCart(Model).subscribe(res => {
      if (this.count !== 0) {
        this.openSnackBar("Well Done! your order is successfully send", "cancle")
      }
      this.clearCart();
      this.ProductsCount();

    })

  }

  ProductsCount() {
    if ("cart" in localStorage) {
      this.count = JSON.parse(localStorage.getItem('cart')!).length;
      this.productservice.raiseData(this.count);
    }
  }

}
