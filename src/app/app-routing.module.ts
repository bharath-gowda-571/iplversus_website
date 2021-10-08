import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatsVsbowlComponent } from './components/bats-vsbowl/bats-vsbowl.component';
import { BatsVsBowlDetailsComponent } from './components/bats-vs-bowl-details/bats-vs-bowl-details.component';
import { HomeComponent } from './components/home/home.component';
const routes: Routes = [
  {
    path:"batsvsbowl",component:BatsVsbowlComponent
  },
  {
    path:"batsvsbowldetails/:batsman/:bowler",component:BatsVsBowlDetailsComponent
  },
  {
    path:"home",component:HomeComponent
  },
  {
    path:"",redirectTo:"home",pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents=[BatsVsbowlComponent]