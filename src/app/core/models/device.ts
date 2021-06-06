export interface Device{
    id:number;
    nameDevice:string;
    deviceType:DeviceType;
    operatingSystem:string;
    data:Date;
    description:string;
  
}



export interface DeviceType{
     id:string;
     name:string;
}