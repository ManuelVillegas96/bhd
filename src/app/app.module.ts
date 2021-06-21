import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AuthInterceptor } from './interceptor'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ActivatedRoute } from '@angular/router';
import { NgxMaskModule, IConfig } from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    NgxMaskModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { 
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy 
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
