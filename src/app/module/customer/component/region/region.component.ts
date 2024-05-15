import { Component } from '@angular/core';
import { Region } from '../../_model/region';
import { RegionService } from '../../_service/region.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from'sweetalert2';
import { SwalMessages } from '../../../commons/_dto/swal-messages';

declare var $: any; // JQuery

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrl: './region.component.css'
})
export class RegionComponent {

  regions: Region[] = []; // Region list

  regionToUpdate: number = 0; // region id to update

  // Region form
  form = this.formBuilder.group({
    region: ["", [Validators.required]],
    code: ["", [Validators.required]],
  });

  submitted = false; // Form submitted

  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor(
    private regionService: RegionService,
    private formBuilder: FormBuilder,
  ){}

  ngOnInit(){
    this.getRegions();
  }

  disableRegion(id: number){
    this.swal.confirmMessage.fire({
      title: 'Favor de confirmar la eliminación de la región',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.regionService.disableRegion(id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.body!.message); // show message
            this.getRegions(); // reload regions
          },
          error: (e) => {
            console.error(e);
            this.swal.errorMessage(e.error!.message); // show message
          }
        });
      }
    });
  }

  enableRegion(id: number){
    this.swal.confirmMessage.fire({
      title: 'Favor de confirmar la activación de la región',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.regionService.enableRegion(id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.body!.message); // show message
            this.getRegions(); // reload regions
          },
          error: (e) => {
            console.error(e);
            this.swal.errorMessage(e.error!.message); // show message
          }
        });
      }
    });
  }

  getRegions(){
    this.regionService.getRegions().subscribe({
      next: (v) => {
        this.regions = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  onSubmit(){
    // validate form
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;


    // validate regionToUpdate
    if(this.regionToUpdate == 0){
      this.onSubmitCreate();
    }else{
      this.onSubmitUpdate();
    }
  }

  onSubmitCreate(){
    // add region to region list
    this.regionService.createRegion(this.form.value).subscribe({
      next: (v) => {
        this.swal.successMessage(v.body!.message); // show message
        this.getRegions(); // reload regions
        this.hideModalForm(); // close modal
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  onSubmitUpdate(){
    // add region to region list
    this.regionService.updateRegion(this.form.value, this.regionToUpdate).subscribe({
      next: (v) => {
        this.swal.successMessage(v.body!.message); // show message
        this.getRegions(); // reload regions
        this.hideModalForm(); // close modal
        this.regionToUpdate = 0; // reset regionToUpdate
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  updateRegion(region: Region){
    this.regionToUpdate = region.region_id;
   
    this.form.reset();
    this.form.controls['region'].setValue(region.region);
    this.form.controls['code'].setValue(region.code);
   
    this.submitted = false;
    $("#modalForm").modal("show");
  }

  showModalForm(){
    $("#modalForm").modal("show");
    this.form.reset();
    this.submitted = false;
    this.regionToUpdate = 0; // reset regionToUpdate
  }

  hideModalForm(){
    $("#modalForm").modal("hide");
  }

}