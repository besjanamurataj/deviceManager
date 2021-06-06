import { DetailDeviceComponent } from './components/detail-device/detail-device.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
const routes: Routes = [
  {path:'home', loadChildren:() =>import('./components/details.module').then(m => m.DetailsModule)},

  {path:'', redirectTo:'home', pathMatch:'full'}
  ,
  {path:'details/:id', component:DetailDeviceComponent},
  {path:'**', component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule]
})
export class AppRoutingModule { }
