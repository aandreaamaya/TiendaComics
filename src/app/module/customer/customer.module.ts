import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionComponent } from './component/region/region.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerDetailComponent } from './component/customer-detail/customer-detail.component';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';
import { CustomerComponent } from './component/customer/customer.component';



@NgModule({
  declarations: [
    RegionComponent,
    CustomerDetailComponent,
    CustomerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPhotoEditorModule

  ]
})
export class CustomerModule { }
