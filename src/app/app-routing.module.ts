import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatsVsbowlComponent } from './components/bats-vsbowl/bats-vsbowl.component';
import { BatsVsBowlDetailsComponent } from './components/bats-vs-bowl-details/bats-vs-bowl-details.component';

import { BatsVsTeamSearchComponent } from './components/bats-vs-team-search/bats-vs-team-search.component';

import { HomeComponent } from './components/home/home.component';
import { BatsVsTeamDetailsComponent } from './components/bats-vs-team-details/bats-vs-team-details.component';

const routes: Routes = [
  {
    path:"batsvsbowl",component:BatsVsbowlComponent,
  },
  {
    path:"batsvsteam",component:BatsVsTeamSearchComponent,
  },
  {
    path:"batsvsteamdetails/:batsman/:team",component:BatsVsTeamDetailsComponent
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