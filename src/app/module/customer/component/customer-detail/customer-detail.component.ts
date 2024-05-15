import { Component } from '@angular/core';
import { Customer } from '../../_model/customer';
import { Region } from '../../_model/region';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../../_service/customer.service';
import { CustomerImageService } from '../../_service/customer-image.service';
import { RegionService } from '../../_service/region.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPhotoEditorService } from 'ngx-photo-editor';
import { SwalMessages } from '../../../commons/_dto/swal-messages';
import { CustomerImage } from '../../_model/customer-image';

declare var $: any; // JQuery

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css'
})
export class CustomerDetailComponent {

  customer: Customer = new Customer();
  rfc: string = "";

  regions: Region[] = [];
  region: Region = new Region();

  // formulario de actualización
  form = this.formBuilder.group({
    name: ["", [Validators.required, Validators.pattern("^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ ]+$")]],
    surname: ["", [Validators.required, Validators.pattern("^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ ]+$")]],
    rfc: ["", [Validators.required, Validators.pattern("^[ñA-Z]{3,4}[0-9]{6}[0-9A-Z]{3}$")]],
    mail: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    region_id: [0, [Validators.required]],
    address: ["", [Validators.required]],
  });
  
  swal: SwalMessages = new SwalMessages(); // swal messages

  submitted = false; // indica si se envió el formulario

  constructor(
    private customerService: CustomerService, // servicio customer de API
    private customerImageService: CustomerImageService, // servicio customer image de API
    private formBuilder: FormBuilder, // formulario
    private regionService: RegionService, // servicio region de API
    private route: ActivatedRoute, // recupera parámetros de la url
    private router: Router, // redirigir a otro componente

    private service: NgxPhotoEditorService
  ){}

  ngOnInit(){
    this.rfc = this.route.snapshot.paramMap.get('rfc')!;
    if(this.rfc){
      this.getCustomer();
      this.getActiveRegions();
    }else{
      this.swal.errorMessage("RFC inválido"); // show message
    }
  }

  // CRUD customer

  getCustomer(){
    this.customerService.getCustomer(this.rfc).subscribe({
      next: (v) => {
        this.customer = v.body!;
        this.getRegion(this.customer.region_id);
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  onSubmit(){
    // valida el formulario
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;

    console.log(this.form.value);
    return;

    this.customerService.updateCustomer(this.form.value, this.customer.customer_id).subscribe({
      next: (v) => {
        this.swal.successMessage(v.body!.message); // show message

        // reload customer if rfc changes
        if(this.form.controls['rfc'].value != this.rfc){
          this.rfc = this.form.controls['rfc'].value!; // update rfc

          let currentUrl = this.router.url.split("/");
          currentUrl.pop();
          currentUrl.push(this.rfc);
          
          this.redirect(currentUrl); // update url
        }
        
        this.getCustomer(); // reload customer

        this.hideModalForm(); // close modal

      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  updateCustomer(){
    this.form.reset();
    this.submitted = false;

    this.form.controls['name'].setValue(this.customer.name);
    this.form.controls['surname'].setValue(this.customer.surname);
    this.form.controls['rfc'].setValue(this.customer.rfc);
    this.form.controls['mail'].setValue(this.customer.mail);
    this.form.controls['region_id'].setValue(this.customer.region_id);
    this.form.controls['address'].setValue(this.customer.address);

    this.showModalForm();
  }

  // customer image

  updateCustomerImage(image: string){
    let customerImage: CustomerImage = new CustomerImage();
    customerImage.customer_image_id = this.customer.image.customer_image_id;
    customerImage.image = image;

    this.customerImageService.updateCustomerImage(customerImage).subscribe({
      next: (v) => {
        this.swal.successMessage(v.body!.message); // show message
        this.getCustomer(); // reload customer
        this.hideModalForm(); // close modal
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  // catalogues

  getActiveRegions(){
    this.regionService.getActiveRegions().subscribe({
      next: (v) => {
        this.regions = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  // auxiliary functions

  getRegion(id: number){
    this.regionService.getRegion(id).subscribe({
      next: (v) => {
        this.region = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  fileChangeHandler($event: any) {
    this.service.open($event, {
      aspectRatio: 1/1,
      autoCropArea: 1,
      resizeToWidth: 360,
      resizeToHeight: 360,
    }).subscribe(data => {
      this.updateCustomerImage(data.base64!);
    });
  }

  redirect(url: string[]){
    this.router.navigate(url);
  }

  hideModalForm(){
    $("#modalForm").modal("hide")
  }

  showModalForm(){
    $("#modalForm").modal("show")
  }
}
