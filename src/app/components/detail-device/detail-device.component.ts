import { DeviceService } from 'src/app/core/service/device.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/core/models/device';

@Component({
  selector: 'app-detail-device',
  templateUrl: './detail-device.component.html',
  styleUrls: ['./detail-device.component.css'],
})
export class DetailDeviceComponent implements OnInit {
  id!: number;
  device!: Device;
  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.getDeviceById(this.id);
    }
  }
  getDeviceById(id: number) {
    this.deviceService.getElementById(id).subscribe((data) => {
      this.device = data;
    },(error) =>{
      console.error(error)
    });
  }

  list() {
    this.router.navigate(['home']);
  }
}
