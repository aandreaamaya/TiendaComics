import { Routes } from '@angular/router';
import { RegionComponent } from '../../customer/component/region/region.component';
import { RegisterComponent } from '../../authentication/register/register.component';
import { LoginComponent } from '../../authentication/login/login.component';
import { SecuredComponent } from '../../authentication/secured/secured.component';
import { authenticationGuard } from '../../authentication/_guard/authentication.guard';
import { ProductComponent } from '../../product/component/product/product.component';
import { CategoryComponent } from '../../product/component/category/category.component';
import { CustomerDetailComponent } from '../../customer/component/customer-detail/customer-detail.component';
import { CustomerComponent } from '../../customer/component/customer/customer.component';
import { InvoiceComponent } from '../../invoice/component/invoice/invoice.component';


export const AppLayoutRoutes: Routes = [
    {path: '', component: RegionComponent},
    {path: 'categoria', component: CategoryComponent},
    {path: "cliente", component: CustomerComponent },
    {path: "cliente/:rfc", component: CustomerDetailComponent },
    {path: "factura", component: InvoiceComponent },
    {path: 'producto', component: ProductComponent},
    {path: 'region', component: RegionComponent},
    // {path: 'register', component: RegisterComponent},
    // {path: 'login', component: LoginComponent},
    {path: 'secured', component: SecuredComponent, canActivate : [authenticationGuard]}
];
