import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatsVsbowlComponent } from './components/bats-vsbowl/bats-vsbowl.component';
import { BatsVsBowlDetailsComponent } from './components/bats-vs-bowl-details/bats-vs-bowl-details.component';
import { BatsVsTeamSearchComponent } from './components/bats-vs-team-search/bats-vs-team-search.component';
const routes: Routes = [
  {
    path:"batsvsbowl",component:BatsVsbowlComponent,
  },
  {
    path:"batsvsteam",component:BatsVsTeamSearchComponent,
  },
  {
    path:"batsvsbowldetails/:batsman/:bowler",component:BatsVsBowlDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents=[BatsVsbowlComponent]