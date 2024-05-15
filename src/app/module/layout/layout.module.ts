import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { FooterComponent } from './app-layout/footer/footer.component';
import { NavbarComponent } from './app-layout/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { AppLayoutRoutes } from './app-layout/app-layout.routing';
import { Navbar2Component } from './app-layout/navbar2/navbar2.component';
import { ProductModule } from '../product/product.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { CustomerModule } from '../customer/customer.module';
import { InvoiceModule } from '../invoice/invoice.module';



@NgModule({
  declarations: [
    AppLayoutComponent,
    FooterComponent,
    NavbarComponent,
    Navbar2Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AppLayoutRoutes),
    ProductModule,
    CustomerModule,
    InvoiceModule,
    AuthenticationModule
  ]
})
export class LayoutModule { }
