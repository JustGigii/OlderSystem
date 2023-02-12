import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common'
import { AppComponent } from './app.component';
import { NavComponent } from './feathers/nav/nav.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BlobComponent } from './feathers/blob/blob.component';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { ProdactdetailsComponent } from './feathers/prodactdetails/prodactdetails.component';
import { PopupProductComponent } from './feathers/popup-product/popup-product.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CartItemComponent } from './feathers/cart-item/cart-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopUpComponent } from './feathers/pop-up/pop-up.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomePageComponent,
    BlobComponent,
    PopupProductComponent,
    CatalogPageComponent,
    ProdactdetailsComponent,
    CartPageComponent,
    CartItemComponent,
    PopUpComponent,
    ProfilePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [ProdactdetailsComponent],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
