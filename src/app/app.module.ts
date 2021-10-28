import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule ,routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';

import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BatsVsBowlDetailsComponent } from './components/bats-vs-bowl-details/bats-vs-bowl-details.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { BatsVsTeamSearchComponent } from './components/bats-vs-team-search/bats-vs-team-search.component';

import { HomeComponent } from './components/home/home.component';
import { BatsVsTeamDetailsComponent } from './components/bats-vs-team-details/bats-vs-team-details.component';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    BatsVsBowlDetailsComponent,
    NavbarComponent,
    BatsVsTeamSearchComponent,
    HomeComponent,
    BatsVsTeamDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ChartsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
