import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { PlayerPopName } from 'src/app/player_pop_names';
import { PlayersService } from 'src/app/services/players.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-bats-vsbowl',
  templateUrl: './bats-vsbowl.component.html',
  styleUrls: ['./bats-vsbowl.component.scss']
})
export class BatsVsbowlComponent implements OnInit {
  constructor(private _playerService:PlayersService,private router:Router,private titleService:Title){}

  myControl1:any = new FormControl();
  myControl2:any = new FormControl();

  pop_name_map=new Map();

  public players:PlayerPopName[]=[];
  public popular_player_names:string[]=[];
  
  filteredOptions1!: Observable<string[]> ;
  filteredOptions2!: Observable<string[]> ;
  error_msg!:string;

  ngOnInit() {

    this.titleService.setTitle("Batsman Vs Bowler Search")
    this._playerService.getPlayerPopNames().subscribe(data=>{
      this.players = data;
      for(var i of this.players)
      {
        this.popular_player_names.push(i.popular_name);
        this.pop_name_map.set(i.popular_name,i.name);
      }
    });

    this.filteredOptions1 = this.myControl1.valueChanges
      .pipe(
        startWith(''),
        map(value1 => this._filter(<string>value1))
      );
    this.filteredOptions2 = this.myControl2.valueChanges
      .pipe(
        startWith(''),
        map(value2 => this._filter(<string>value2))
      );
  }
  
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    
    
    return this.popular_player_names.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  ButtonClick(){
    
    var batsman=this.myControl1.value;
    var bowler=this.myControl2.value;
    var batsman_code_name=this.pop_name_map.get(batsman)
    var bowler_code_name=this.pop_name_map.get(bowler);
    
    if(batsman_code_name==undefined){
      this.error_msg="Choose a Batsman"
      
    }

    else if(bowler_code_name==undefined){
      this.error_msg="Choose a Bowler"
      
    }

    else if(batsman_code_name==bowler_code_name){
      this.error_msg="Batsman and Bowler cannot be same"
      
    }
    else{
    this.router.navigate(['/batsvsbowldetails',batsman_code_name,bowler_code_name]);

    }
  }
}
