import { Component,OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
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
    this.getDeviceAll();
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
          this.getDeviceAll();
        });
      }
    });
  }

  open(action: string, device?: Device) {
    console.log(device);

    const dialogRef = this.dialogService.open(AddEditDeviceComponent, {
      data: { ...device } || {},
    });
    console.log(dialogRef);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getDeviceAll();
      }
    });
  }
  getDeviceAll() {
    this.deviceService.getAll().subscribe((data) => {
      this.dataSource = data;
      console.log(this.dataSource);
    },(error) =>{
      console.error(error);
    });
  }
}
