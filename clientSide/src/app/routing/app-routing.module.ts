import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { CatalogPageComponent } from '../pages/catalog-page/catalog-page.component';
import { CartPageComponent } from '../pages/cart-page/cart-page.component';
import { ProfilePageComponent } from '../pages/profile-page/profile-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/homePage', pathMatch: 'full' },
  { path: 'homePage', component: HomePageComponent },
  { path: 'management', component: ProfilePageComponent },
  { path: 'productsCatalog', component: CatalogPageComponent },
  { path: 'cartPage', component: CartPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
