import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common'
import { AppComponent } from './app.component';
import { NavComponent } from './feathers/nav/nav.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BlobComponent } from './feathers/blob/blob.component';
import { ProductComponent } from './feathers/product/product.component';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomePageComponent,
    BlobComponent,
    ProductComponent,
    CatalogPageComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
