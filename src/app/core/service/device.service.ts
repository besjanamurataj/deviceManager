import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Device } from '../models/device';


const baseUrl = `${environment.deviceApi}`

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http:HttpClient) { }


  getAll():Observable<Device[]>{
    return this.http.get<Device[]>(baseUrl)
  }

  delete(id:number){
    return this.http.delete(`${baseUrl}/${id}`);
  }

  update(id:number,body:any){
    return this.http.put<Device>(`${baseUrl}/${id}`,body);
  }

  getElementById(id:number):Observable<Device>{
    return this.http.get<Device>(`${baseUrl}/${id}`);
  }
  create(device:Device):Observable<Device>{
    return this.http.post<Device>(baseUrl,device)
  }
}
