import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DtoCustomerList } from '../../_dto/DtoCustomerList';
import { Region } from '../../_model/region';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../../_service/customer.service';
import { RegionService } from '../../_service/region.service';
import { SwalMessages } from '../../../commons/_dto/swal-messages';

declare var $: any; // jquery

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

  customers: DtoCustomerList[] = []; // lista de clientes
  regions: Region[] = []; // lista de regiones

  // formulario de registro
  form = this.formBuilder.group({
    name: ["", [Validators.required, Validators.pattern("^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ ]+$")]],
    surname: ["", [Validators.required, Validators.pattern("^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ ]+$")]],
    rfc: ["", [Validators.required, Validators.pattern("^[ñA-Z]{3,4}[0-9]{6}[0-9A-Z]{3}$")]],
    mail: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    region_id: ["", [Validators.required]],
    address: ["", [Validators.required]],
  });

  submitted = false; // indica si se envió el formulario
  
  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor(
    private customerService: CustomerService, // servicio customer de API
    private formBuilder: FormBuilder, // formulario
    private regionService: RegionService, // servicio region de API
    private router: Router, // redirigir a otro componente
  ){}

  // primera función que se ejecuta
  ngOnInit(){
    this.getCustomers();
  }

  // CRUD customer

  disableCustomer(id: number){
    this.swal.confirmMessage.fire({
      title: 'Favor de confirmar la eliminación del cliente',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.customerService.disableCustomer(id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.body!.message); // show message
            this.getCustomers(); // reload customers
          },
          error: (e) => {
            console.error(e);
            this.swal.errorMessage(e.error!.message); // show message
          }
        });
      }
    });
  }

  enableCustomer(id: number){
    this.swal.confirmMessage.fire({
      title: 'Favor de confirmar la activación del cliente',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.customerService.enableCustomer(id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.body!.message); // show message
            this.getCustomers(); // reload customers
          },
          error: (e) => {
            console.error(e);
            this.swal.errorMessage(e.error!.message); // show message
          }
        });
      }
    });
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe({
      next: (v) => {
        this.customers = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  onSubmit(){
    // valida el formulario
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;

    this.customerService.createCustomer(this.form.value).subscribe({
      next: (v) => {
        this.swal.successMessage(v.body!.message); // show message
        this.getCustomers(); // reload regions
        this.hideModalForm(); // close modal
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  showCustomer(rfc: string){
    this.router.navigate(['customer/' + rfc]);
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

  // modals 

  hideModalForm(){
    $("#modalForm").modal("hide");
  }

  showModalForm(){
    this.form.reset();
    this.submitted = false;
    this.getActiveRegions();
    $("#modalForm").modal("show");
  }
}
