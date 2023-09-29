import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllProductsComponent } from "./products/components/all-products/all-products.component";
import { ProductDetailsComponent } from "./products/components/product-details/product-details.component";
import { CartComponent } from "./carts/components/cart/cart.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { HomeComponent } from "./home/home.component";
const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"home",component:HomeComponent},
    {path:"products",component:AllProductsComponent},
    {path:"details/:id",component:ProductDetailsComponent},
    {path:"cart",component:CartComponent},
    {path:"**",component:PageNotFoundComponent}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}