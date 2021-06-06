import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Device } from 'src/app/core/models/device';
import { DeviceService } from 'src/app/core/service/device.service';
import { AddEditDeviceComponent } from '../add-edit-device/add-edit-device.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  dataSource: Device[] = [];
  constructor(
    private deviceService: DeviceService,
    public dialogService: MatDialog
  ) {}

  ngOnInit() {
    this.deviceService.getAll().subscribe((data) => {
      this.dataSource = data;
      console.log(this.dataSource);
    });
  }
  displayedColumns: string[] = [
    'id',
    'nameDevice',
    'deviceType',
    'operatingSystem',
    'data',
    'actions',
  ];

  deleteDetails(device: any) {
    const dialogRef = this.dialogService.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deviceService.delete(device.id).subscribe((data) => {
          this.deviceService.getAll().subscribe((data) => {
            this.dataSource = data;
          });
          // const index = this.dataSource.indexOf(device);
          // console.log(index)
          // this.dataSource.splice(index,1);
          // console.log(  this.dataSource.splice(index,1));

          //   console.log(this.dataSource);
        });
      }
    });
  }

  open(action: string, device?: Device) {
    console.log(device);

    const dialogRef = this.dialogService.open(AddEditDeviceComponent, {
      data: {...device} || {},
    });
    console.log(dialogRef);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.event == 'Add') {
          console.log('add');
        } else (result.event == 'Update');
        console.log('update');
      }
    });
  }
}
