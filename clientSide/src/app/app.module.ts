import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common'
import { AppComponent } from './app.component';
import { NavComponent } from './feathers/nav/nav.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BlobComponent } from './feathers/blob/blob.component';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { PopupProductComponent } from './feathers/popup-product/popup-product.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopUpComponent } from './feathers/pop-up/pop-up.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProductDetailsComponent } from './feathers/product-details/product-details.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { StartPageLoginComponent } from './pages/start-page-login/start-page-login.component';
import { MicrosoftMsalService } from './services/login/microsoft-msal.service';
import { SelectedProductComponent } from './pages/selected-product/selected-product.component';



export function MSAL_InctanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: 'c25247c6-3cd6-4a30-8af2-7262a89b31c4', //בעיה במה שהבאת לי
      redirectUri:(environment.production)?'https://oldersystemweb.azurewebsites.net/': 'http://localhost:4200'
      // \redirectUri: 'https://https://oldersystem.azurewebsites.net'
    }
  })
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('http://localhost:4200/', ['api://c25247c6-3cd6-4a30-8af2-7262a89b31c4/access_as_user']);
  // protectedResourceMap.set('https://https://oldersystem.azurewebsites.net', ['api://aaefe659-f843-4c41-8e77-e07b882bff7b/access_as_user']);
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read', 'mail.read']);
  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap
  };
}


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomePageComponent,
    BlobComponent,
    PopupProductComponent,
    CatalogPageComponent,
    CartPageComponent,
    PopUpComponent,
    ProfilePageComponent,
    ProductDetailsComponent,
    StartPageLoginComponent,
    SelectedProductComponent,
    // MicrosoftMsalService
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MsalModule,
    HttpClientModule
    // MicrosoftMsalService,

  ],
  entryComponents: [ProductDetailsComponent],
  providers: [
    DatePipe,
    {
      provide: MSAL_INSTANCE,
      useFactory: MSAL_InctanceFactory
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MicrosoftMsalService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
