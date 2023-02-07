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
import { FormsModule } from '@angular/forms';
import { ProdactdetailsComponent } from './feathers/prodactdetails/prodactdetails.component';
import { PopupProductComponent } from './feathers/popup-product/popup-product.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
<<<<<<< Updated upstream
import { CartItemComponent } from './feathers/cart-item/cart-item.component';
=======
import { MatDialogModule  } from '@angular/material/dialog';
>>>>>>> Stashed changes

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
    CartItemComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
