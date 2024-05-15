import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerModule } from './module/customer/customer.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule } from './module/authentication/authentication.module';
import { LayoutModule } from './module/layout/layout.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptorInterceptor } from './core/interceptor/jwt-interceptor.interceptor';
import { CommonsModule } from './module/commons/commons.module';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomerModule,
    AuthenticationModule,   
    NgxPhotoEditorModule,
    CommonsModule  
  ],
  providers: [
    provideHttpClient(withInterceptors([jwtInterceptorInterceptor]))

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
