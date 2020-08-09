import {NgModule, Component} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OrderComponent} from './components/my-order/order/order.component';
import {ShoppingCartComponent} from './components/shoping-cart/shopping-cart/shopping-cart.component';
import {OrderDetailsComponent} from './components/my-order/order-details/order-details.component';
import {CartComponent} from './components/shoping-cart/cart/cart.component';
import {RegistrationComponent} from './components/user-management/registration/registration.component';
import {LoginComponent} from './components/user-management/login/login.component';
import {LoginSuccessComponent} from './components/user-management/login-success/login-success.component';
import {ViewWishlistComponent} from './components/wishlist-management/view-wishlist/view-wishlist.component';
import {HomeComponent} from './components/shared/home/home.component';
import {AddProductComponent} from './components/product-management/products/add-product/add-product.component';
import {UpdateProductComponent} from './components/product-management/products/update-product/update-product.component';
import {AddProductMasterComponent} from './components/product-management/add-product-master/add-product-master.component';
import {AboutUsComponent} from './components/shared/about-us/about-us.component';
import {AddRetailerProductComponent} from './components/retailer-inventory-management/add-retailer-product/add-retailer-product.component';
import {RetailerProductListComponent} from './components/retailer-inventory-management/retailer-product-list/retailer-product-list.component';
import {SearchProductComponent} from './components/retailer-inventory-management/search-product/search-product.component';
import {ViewAddressComponent} from './components/address-management/view-address/view-address.component';
import {AddAddressComponent} from './components/address-management/add-address/add-address.component';
import {EditAddressComponent} from './components/address-management/edit-address/edit-address.component';
import {GrowthReportComponent} from './components/admin-report-management/growth-report/growth-report.component';
import {RevenueReportComponent} from './components/admin-report-management/revenue-report/revenue-report.component';
import {MonthlyComponent} from './components/admin-report-management/monthly/monthly.component';
import {QuaterlyComponent} from './components/admin-report-management/quaterly/quaterly.component';
import {YearlyComponent} from './components/admin-report-management/yearly/yearly.component';
import {ViewProductComponent} from './components/product-management/products/view-product/view-product.component';
import {AuthGuard} from './router-guard/auth.guard';
import {RetailerUserGuard} from './router-guard/retailer-user.guard';
import {ProductMasterGuard} from './router-guard/product-master.guard';
import {AdminGuard} from './router-guard/admin.guard';
import {UpdateRetailerProductComponent} from './components/retailer-inventory-management/update-retailer-product/update-retailer-product.component';
import {LoginGuard} from './router-guard/login.guard';
import {NotFoundComponent} from './components/error-pages/not-found/not-found.component';
import {InternalServerErrorComponent} from './components/error-pages/internal-server-error/internal-server-error.component';


const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'products', component: ShoppingCartComponent, canActivate: [AuthGuard, RetailerUserGuard]},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuard, RetailerUserGuard]},
  {path: 'orders', component: OrderComponent, canActivate: [AuthGuard, RetailerUserGuard]},
  {path: 'orders/:orderId', component: OrderDetailsComponent, canActivate: [AuthGuard, RetailerUserGuard]},
  // {path: 'loginsuccess', component: LoginSuccessComponent, canActivate: [AuthGuard]},
  {path: 'registration', component: RegistrationComponent, canActivate: [LoginGuard]},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'wishlist', component: ViewWishlistComponent, canActivate: [AuthGuard, RetailerUserGuard]},
  {path: 'addProduct', component: AddProductComponent, canActivate: [AuthGuard, ProductMasterGuard]},
  {path: 'view-product/edit/:id', component: UpdateProductComponent, canActivate: [AuthGuard, ProductMasterGuard]},
  {path: 'view-product', component: ViewProductComponent, canActivate: [AuthGuard, ProductMasterGuard]},
  {path: 'addProductMaster', component: AddProductMasterComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'aboutUs', component: AboutUsComponent},
  {path: 'add-retailer-product', component: AddRetailerProductComponent, canActivate: [AuthGuard, RetailerUserGuard]},
  {path: 'search-retailer-product', component: SearchProductComponent, canActivate: [AuthGuard, RetailerUserGuard]},
  {path: 'update-retailer-product/:inventoryId', component: UpdateRetailerProductComponent, canActivate: [AuthGuard, RetailerUserGuard]},
  {path: 'viewall-retailer-product', component: RetailerProductListComponent, canActivate: [AuthGuard, RetailerUserGuard]},
  {path: 'address/view-address', component: ViewAddressComponent, canActivate: [AuthGuard, RetailerUserGuard]},
  {path: 'address/add-address', component: AddAddressComponent, canActivate: [AuthGuard, RetailerUserGuard]},
  {path: 'address/edit-address/:addressId', component: EditAddressComponent, canActivate: [AuthGuard, RetailerUserGuard]},
  {path: 'growth-report', component: GrowthReportComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'revenue-report', component: RevenueReportComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'monthly', component: MonthlyComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'quaterly', component: QuaterlyComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'yearly', component: YearlyComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: '404', component: NotFoundComponent},
  {path: '500', component: InternalServerErrorComponent},
  {path: '**', redirectTo: '404', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
