import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { ManagementComponent } from '../pages/management/management.component';
import { CatalogPageComponent } from '../pages/catalog-page/catalog-page.component';
import { CartPageComponent } from '../pages/cart-page/cart-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/homePage', pathMatch: 'full' },
  { path: 'homePage', component: HomePageComponent },
  { path: 'management', component: ManagementComponent },
  { path: 'productsCatalog', component: CatalogPageComponent },
  { path: 'cartPage', component: CartPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
