import { DetailDeviceComponent } from './components/detail-device/detail-device.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'home', loadChildren:() =>import('./components/details.module').then(m => m.DetailsModule)},

  {path:'', redirectTo:'home', pathMatch:'full'}
  ,
  {path:'details/:id', component:DetailDeviceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
