import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { ManagementComponent } from '../pages/management/management.component';
import { CatalogPageComponent } from '../pages/catalog-page/catalog-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'homePage', component: HomePageComponent },
  { path: 'management', component: ManagementComponent },
  { path: 'productsCatalog', component: CatalogPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
