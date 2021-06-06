
import { Component, Inject, OnInit } from '@angular/core';
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
  local_data: Device;
  device: Device[] = [];
  deviceOption: any = [
    {
      name: 'Router',
    },
    { name: 'Mobile Phone' },
    { name: 'Laptop' },
  ];
  constructor(
    public dialogRef: MatDialogRef<AddEditDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Device,
    private deviceService: DeviceService
  ) {
    this.local_data = { ...data };
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    if (this.data.id) {
      this.deviceService.update(this.data.id, this.data).subscribe(
        () => {},
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.deviceService.create(this.data).subscribe(
        () => {},
        (error) => {
          console.error(error);
        }
      );
    }

    this.dialogRef.close({ data: this.local_data });
    this.deviceService.getAll().subscribe(
      (data) => {
        this.device = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  changeSelect(event: any) {
    switch (event) {
      case 'Laptop':
        this.data.customInput = 'RAM';
        break;
      case 'Mobile Phone':
        this.data.customInput = ' Camera resolution';
        break;
      case 'Router':
        this.data.customInput = 'Coverage area';
        break;
    }
  }
}
