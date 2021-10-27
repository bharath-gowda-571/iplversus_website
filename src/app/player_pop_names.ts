export interface PlayerPopName{
    name:string,
    popular_name:string
}
export interface Extras{
    byes?:number,
    legbyes?:number,
    noballs?:number,
    penalty?:number,
    wides?:number,
}
export interface Wicket{
    player_out:string,
    kind:string
}
export interface Runs{
    batsman:number,
    extras:number,
    total:number
}
export interface Ball{
    ball:string,
    batsman:string,
    batting_hand:string,
    batting_team:string,
    bowler:string,
    bowling_hand:string,
    bowling_team:string,
    bowling_type:string,
    match_id:string,
    non_striker:string,
    runs:Runs,
    specific_bowling_type?:string,
    wicket?:Wicket,
    year:string,
    extras?:Extras
}

export interface batVTeam{
    balls:number, 
    fours: number,
    match_id: string,
    position: number,
    runs: number,
    sixes: number,
    status: string,
    year: string,
    }