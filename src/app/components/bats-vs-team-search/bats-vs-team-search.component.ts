import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { PlayerPopName } from 'src/app/player_pop_names';
import { PlayersService } from 'src/app/services/players.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-bats-vs-team-search',
  templateUrl: './bats-vs-team-search.component.html',
  styleUrls: ['./bats-vs-team-search.component.scss']
})

export class BatsVsTeamSearchComponent implements OnInit {
  constructor(private _playerService:PlayersService,private router:Router,private titleService:Title){}

  myControl1:any = new FormControl();
  myControl2:any = new FormControl();

  pop_name_map=new Map();

  public players:PlayerPopName[]=[];
  public popular_player_names:string[]=[];
  public teams:String[]=[];
  public team_names:String[]=[];
  
  filteredOptions1!: Observable<string[]> ;
  filteredOptions2!: Observable<string[]> ;
  error_msg!:string;

  ngOnInit() {
    
    this.titleService.setTitle("Batsman Vs Team Search")
    this._playerService.getPlayerPopNames().subscribe(data=>{
      this.players = data;
      for(var i of this.players){
        this.popular_player_names.push(i.popular_name);
        this.pop_name_map.set(i.popular_name,i.name);
      }
    });

    this._playerService.getTeamNames().subscribe(data=>{
      this.teams = data;
      for(var i of this.teams){
        this.team_names.push(i);
      }
    });

    this.filteredOptions1 = this.myControl1.valueChanges
      .pipe(
        startWith(''),
        map(value1 => this._filterbats(<string>value1))
      );
    this.filteredOptions2 = this.myControl2.valueChanges
      .pipe(
        startWith(''),
        map(value2 => this._filterteams(<string>value2))
      );
  }
  
  
  private _filterbats(value: string): String[] {
    const filterValue = value.toLowerCase();  
    return this.popular_player_names.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterteams(value: string): String[] {
    const filterValue = value.toLowerCase();
    return this.team_names.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  ButtonClick(){
    
    var batsman=this.myControl1.value;
    var team=this.myControl2.value;
    var batsman_code_name=this.pop_name_map.get(batsman)
    
    if(batsman_code_name==undefined){
      this.error_msg="Choose a batsman"
      
    }

    else if(!this.teams.includes(team)){
      this.error_msg="Choose a team"
      
    }
    else{
      this.router.navigate(['/batsvsteamdetails',batsman_code_name,team]);

    }
  }
}