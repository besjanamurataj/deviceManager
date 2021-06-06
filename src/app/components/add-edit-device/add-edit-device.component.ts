import { DeviceType } from './../../core/models/device';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from 'src/app/core/models/device';
import { DeviceService } from 'src/app/core/service/device.service';

@Component({
  selector: 'app-add-edit-device',
  templateUrl: './add-edit-device.component.html',
  styleUrls: ['./add-edit-device.component.css'],
})
export class AddEditDeviceComponent implements OnInit {
  action: string;
  local_data: any;
  device: Device[] = [];
  id!: number;
  deviceOption:any=[{
    id: '1',
    name: 'Router',
   },
   {
    id: '2',
    name: 'Mobile Phone',
  
   },
   {
    id: '3',
    name: 'Laptop',

   }]
  // isAddModal: boolean | undefined;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddEditDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Device,
    private route: ActivatedRoute,
    private deviceService: DeviceService
  ) {
    console.log(data);
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  ngOnInit(): void {
    this.deviceService.getAll().subscribe((data) => {
      this.device = data;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close({ event: this.action, data: this.local_data });
    this.deviceService.create(this.data).subscribe(data=>{
      
      console.log(this.data);})



    // this.deviceService.update(this.id, this.local_data).subscribe((data) => {});
    // this.onNoClick();
    // console.log('data');
    // });

    //  }
     
      //  this.deviceService.update(this.id,this.data).subscribe(data =>{
      //   console.log(this.data);
      // })
    // }
  }
}
