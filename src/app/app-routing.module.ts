import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatsVsbowlComponent } from './components/bats-vsbowl/bats-vsbowl.component';
import { BatsVsBowlDetailsComponent } from './components/bats-vs-bowl-details/bats-vs-bowl-details.component';

import { BatsVsTeamSearchComponent } from './components/bats-vs-team-search/bats-vs-team-search.component';

import { HomeComponent } from './components/home/home.component';

import { BowlVsTeamSearchComponent } from './components/bowl-vs-team-search/bowl-vs-team-search.component';
import { BowlVsTeamDetailsComponent } from './components/bowl-vs-team-details/bowl-vs-team-details.component';

import { BatsVsTeamDetailsComponent } from './components/bats-vs-team-details/bats-vs-team-details.component';

const routes: Routes = [
  
  {
    path:"batsvsbowl",component:BatsVsbowlComponent,
  },
  {
    path:"batsvsteam",component:BatsVsTeamSearchComponent,
  },
  {
    path:"bowlvsteam",component:BowlVsTeamSearchComponent,
  },
  {
    path:"batsvsteamdetails/:batsman/:team",component:BatsVsTeamDetailsComponent

  },
  {
    path:"batsvsbowldetails/:batsman/:bowler",component:BatsVsBowlDetailsComponent
  },
  {
    path:"bowlvsteamdetails/:bowler/:team",component:BowlVsTeamDetailsComponent
  },
  {
    path:"**",component:HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents=[BatsVsbowlComponent]