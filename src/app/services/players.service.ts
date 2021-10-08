import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlayerPopName,Runs,Extras,Wicket,Ball } from '../player_pop_names';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/toPromise'
@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private http:HttpClient) { }

  getPlayerPopNames():Observable<PlayerPopName[]>{
    return this.http.get<PlayerPopName[]>("https://ipl-versus-default-rtdb.asia-southeast1.firebasedatabase.app/pop_player_names.json");
  }

  getBatsVsBowlBalls(batsman:string,bowler:string){
      return this.http.get("https://cricket-statistics-default-rtdb.asia-southeast1.firebasedatabase.app/ipl/players_balls_involved/"+encodeURI(batsman)+"/batting/"+encodeURI(bowler)+".json")
  }

  async getBallData(ball:string):Promise<Ball>{
    return (await this.http.get<Ball>("https://cricket-statistics-default-rtdb.asia-southeast1.firebasedatabase.app/ipl/all_balls/"+encodeURI(ball)+".json").toPromise())
  }

  getTeamNames():Observable<String[]>{
    return this.http.get<String[]>("https://ipl-versus-default-rtdb.asia-southeast1.firebasedatabase.app/team_names.json");
  }
}

