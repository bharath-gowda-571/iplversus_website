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


  async getBatsmanVsBowlerData(batsman:string,bowler:string):Promise<Ball[]>
  {
    return (await this.http.get<Ball[]>("https://ipl-versus-default-rtdb.asia-southeast1.firebasedatabase.app/batsman_vs_bowler_data/" + encodeURI(batsman) + "/" + encodeURI(bowler) + ".json").toPromise())
    
  }
}

