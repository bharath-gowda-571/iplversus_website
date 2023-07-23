import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PlayerPopName,Runs,Extras,Wicket,Ball,BowlingInnings ,batVTeam } from '../player_pop_names';

import { environment } from '../../environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  public BASE_URL!: string ;
  constructor(private http:HttpClient) {
    if(environment.production==false){
     this.BASE_URL="http://localhost:8000/"
    }
    else{
      this.BASE_URL=" https://ohgjfvrv98.execute-api.ap-south-1.amazonaws.com/prod/"
    }
   }

  getPlayerPopNames():Observable<PlayerPopName[]>{
    return this.http.get<PlayerPopName[]>(this.BASE_URL+"pop_player_names");
  }

  getTeamNames():Observable<String[]>{
    return this.http.get<String[]>(this.BASE_URL+"team_names");
  }

  
  async getBatsmanVsBowlerData(batsman:string,bowler:string):Promise<Ball[]>
  {
    
    return (await this.http.get<Ball[]>(this.BASE_URL+"batsman_vs_bowler_data/" + encodeURI(batsman) + "/" + encodeURI(bowler)).toPromise())
    
  }

  async getBatsmanVsTeamData(batsman:string,team:string):Promise<batVTeam[]>
  {
    return (await this.http.get<batVTeam[]>(this.BASE_URL+"player_vs_team/" + encodeURI(batsman) + "/batting/" + encodeURI(team) ).toPromise());
  }

  async getBowlerVsTeamData(bowler:string,team:string):Promise<BowlingInnings[]>{
    
    return (await this.http.get<BowlingInnings[]>(this.BASE_URL+"player_vs_team/"+encodeURI(bowler)+"/"+"bowling/"+encodeURI(team)).toPromise())

  }

  async getPlayerPicture(name:string):Promise<string>{
    return (await this.http.get<string>(this.BASE_URL+"player_pictures/"+encodeURI(name)).toPromise())
  }
}

