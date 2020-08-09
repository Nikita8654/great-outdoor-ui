import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { CartComponent } from './components/shoping-cart/cart/cart.component';
import { FilterComponent } from './components/shoping-cart/filters/filter/filter.component';
import { ProductItemComponent } from './components/product/product-item/product-item.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ShoppingCartComponent } from './components/shoping-cart/shopping-cart/shopping-cart.component';
import { OrderComponent } from './components/my-order/order/order.component';
import { OrderDetailsComponent } from './components/my-order/order-details/order-details.component';
import { CancelOrderComponent } from './components/my-order/cancel-order/cancel-order.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './components/user-management/login/login.component';
import { RegistrationComponent } from './components/user-management/registration/registration.component';
import { LoginSuccessComponent } from './components/user-management/login-success/login-success.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ViewWishlistComponent } from './components/wishlist-management/view-wishlist/view-wishlist.component';
import { HomeComponent } from './components/shared/home/home.component';
import { AddProductMasterComponent } from './components/product-management/add-product-master/add-product-master.component';
import { InternalServerErrorComponent } from './components/error-pages/internal-server-error/internal-server-error.component';
import { NotFoundComponent } from './components/error-pages/not-found/not-found.component';
import { AddProductComponent } from './components/product-management/products/add-product/add-product.component';
import { UpdateProductComponent } from './components/product-management/products/update-product/update-product.component';

import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AboutUsComponent } from './components/shared/about-us/about-us.component';


import {MatDatepickerModule} from '@angular/material/datepicker';
import { TimeStampToDatePipe } from './pipes/time-stamp-to-date.pipe';
import { TimeStampToTimePipe } from './pipes/time-stamp-to-time.pipe';
import { SearchProductComponent } from './components/retailer-inventory-management/search-product/search-product.component';
import { RetailerProductListComponent } from './components/retailer-inventory-management/retailer-product-list/retailer-product-list.component';
import { RetailerInventoryProductService } from './services/retailer-inventory-product.service';
import { UserService } from './services/user.service';
import { WishlistService } from './services/wishlist.service';
import { AddRetailerProductComponent } from './components/retailer-inventory-management/add-retailer-product/add-retailer-product.component';
import { MonthlyComponent } from './components/admin-report-management/monthly/monthly.component';
import { YearlyComponent } from './components/admin-report-management/yearly/yearly.component';
import { QuaterlyComponent } from './components/admin-report-management/quaterly/quaterly.component';
import { GrowthReportComponent } from './components/admin-report-management/growth-report/growth-report.component';
import { RevenueReportComponent } from './components/admin-report-management/revenue-report/revenue-report.component';
import { AddAddressComponent } from './components/address-management/add-address/add-address.component';
import { EditAddressComponent } from './components/address-management/edit-address/edit-address.component';
import { ViewAddressComponent } from './components/address-management/view-address/view-address.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AddressService } from './services/address.service';
import { ViewProductComponent } from './components/product-management/products/view-product/view-product.component';
import { AuthGuard } from './router-guard/auth.guard';
import { AdminGuard } from './router-guard/admin.guard';
import { RetailerUserGuard } from './router-guard/retailer-user.guard';
import { ProductMasterGuard } from './router-guard/product-master.guard';
import { UpdateRetailerProductComponent } from './components/retailer-inventory-management/update-retailer-product/update-retailer-product.component';
import { LoginGuard } from './router-guard/login.guard';
import { AdminReportService } from './services/admin-report.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    CartComponent,
    FilterComponent,
    ProductItemComponent,
    ProductListComponent,
    ShoppingCartComponent,
    OrderComponent,
    OrderDetailsComponent,
    CancelOrderComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    LoginSuccessComponent,
    ViewWishlistComponent,
    HomeComponent,
    AddProductMasterComponent,
    InternalServerErrorComponent,
    NotFoundComponent,
    AddProductComponent,
    UpdateProductComponent,
    AboutUsComponent,
    TimeStampToTimePipe,
    TimeStampToDatePipe,
    SearchProductComponent,
    RetailerProductListComponent,
    AddRetailerProductComponent,
    MonthlyComponent,
    YearlyComponent,
    QuaterlyComponent,
    GrowthReportComponent,
    RevenueReportComponent,
    AddAddressComponent,
    EditAddressComponent,
    ViewAddressComponent,
    ViewProductComponent,
    UpdateRetailerProductComponent
  ],
  entryComponents:[CancelOrderComponent,LoginSuccessComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSelectModule,
    FlexLayoutModule,
    NoopAnimationsModule,
    MDBBootstrapModule,
    MatDatepickerModule,
    MatTableModule
   
  ],
  providers: [AuthGuard,LoginGuard, AdminGuard,RetailerUserGuard,ProductMasterGuard, ProductService,CartService,OrderService,RetailerInventoryProductService,UserService,WishlistService,AddressService,AdminReportService, { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
