import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { batVTeam } from 'src/app/player_pop_names';
import { PlayersService } from 'src/app/services/players.service';
import {Title} from '@angular/platform-browser';

interface DataEachYear{
  [year:string]:{
    runs:number;
    balls:number;
    strike_rate:any;
    bat_avg:any;
    matches:string[];
    fours:number;
    sixes:number;
    dissmissals:number;
    h_score:number;
    bat_pos:number[];
    ducks:number;
    thirties:number;
    fifties:number;
    hundreds:number;
  }
}

interface runs_balls_sr{
  runs:number;
  balls:number;
  strike_rate:number;
}

export interface IHash {
  [match: string] : runs_balls_sr;
}

@Component({
  selector: 'app-bats-vs-team-details',
  templateUrl: './bats-vs-team-details.component.html',
  styleUrls: ['./bats-vs-team-details.component.scss']
})

export class BatsVsTeamDetailsComponent implements OnInit {

  public loading:boolean = true;
  public yearTabsStyles!:string[];
  public batsman!:any;
  public team!:any;
  public batVTeamData:batVTeam[]=[];
  nvr_fcd_off: boolean = false;
  data_each_year: DataEachYear={};
  public data_by_match:IHash={};
  inngs_arr:string[]=[];
  runs: number = 0;
  fours: number = 0;
  sixes: number = 0;
  balls: number = 0 ;
  h_score: number = 0;
  ducks: number = 0;
  thirties: number = 0;
  fifties: number = 0;
  hundreds: number = 0;
  innings: number = 0;
  bat_pos: number[] = [];
  dissmissals: number = 0;
  bat_avg: any = 0;
  strike_rate: any = 0;
  sr_chart_data: any = [];
  ba_chart_data: any = [];
  lineChartLabels1: string[] = [];

  constructor(private route:ActivatedRoute, private _playerService:PlayersService,private titleService:Title) { }

  async ngOnInit(): Promise<void> {

    this.batsman = this.route.snapshot.paramMap.get("batsman")
    this.team = this.route.snapshot.paramMap.get("team")

    this.titleService.setTitle(this.batsman+" Vs "+this.team)
    this.batVTeamData = await this._playerService.getBatsmanVsTeamData(this.batsman,this.team);

    this.loading = false
    if(this.batVTeamData == null){
      this.nvr_fcd_off =true
      return
    }

    for(var data of this.batVTeamData){

      if(this.data_each_year[data.year]==undefined){
        this.data_each_year[data.year]=
        {
          runs:0,
          balls:0,
          strike_rate:0,
          bat_avg:"player was never out",
          matches:[],
          fours:0,
          sixes:0,
          dissmissals:0,
          h_score:0,
          bat_pos:[],
          ducks:0,
          thirties:0,
          fifties:0,
          hundreds:0
        }

        this.lineChartLabels = this.push_in_sorted_order(this.lineChartLabels, data.year)
        this.lineChartLabels1 = this.push_in_sorted_order(this.lineChartLabels1, data.year)
      }

      // checking if match id is in data_by_match
      if(this.data_by_match[data.match_id]==undefined){
        this.data_each_year[data.year].matches.push(data.match_id)
        this.inngs_arr.push(data.match_id)
        this.data_by_match[data.match_id]={
          runs:0,
          balls:0,
          strike_rate:0
        }
      }
      //innings
      this.innings++;
      this.data_each_year[data.year].matches.push(data.match_id);

      //runs
      this.runs += data.runs;
      this.data_each_year[data.year].runs += data.runs;
      if(data.runs>this.h_score)
        this.h_score = data.runs;
      if(data.runs==0){
        this.ducks++;
        this.data_each_year[data.year].ducks++;
      }
      if(data.runs>100){
        this.hundreds++;
        this.data_each_year[data.year].hundreds++;
      }
      if(data.runs>50 && data.runs<100){
        this.fifties++;
        this.data_each_year[data.year].fifties++;
      }
      if(data.runs>30 && data.runs<50){
        this.thirties++;
        this.data_each_year[data.year].thirties++;
      }

      //fours
      this.fours += data.fours;
      this.data_each_year[data.year].fours += data.fours;

      //sixes
      this.sixes += data.sixes;
      this.data_each_year[data.year].sixes += data.sixes;

      //balls
      this.balls += data.balls;
      this.data_each_year[data.year].balls += data.balls;

      //batpositions
      !this.bat_pos.includes(data.position)? this.bat_pos.push(data.position): null;
      !this.data_each_year[data.year].bat_pos.includes(data.position)? this.data_each_year[data.year].bat_pos.push(data.position): null;

      //strikerate
      this.data_each_year[data.year].strike_rate = ((this.data_each_year[data.year].runs/this.data_each_year[data.year].balls)*100).toFixed(2);
      
      //dismissals
      if(data.status == "out"){
        this.dissmissals++;
        this.data_each_year[data.year].dissmissals++;
      }

      //batting average
      if(this.data_each_year[data.year].dissmissals!=0){
        this.data_each_year[data.year].bat_avg = (this.data_each_year[data.year].runs/this.data_each_year[data.year].dissmissals).toFixed(2);
      }

    }

    if(this.dissmissals != 0)
      this.bat_avg = (this.runs/this.dissmissals).toFixed(2);
    else{
      this.bat_avg = "he was never out";
    }

    this.strike_rate = ((this.runs/this.balls)*100).toFixed(2);


    this.bat_avg_problem(this.lineChartLabels1, 0);
    for(var i of this.lineChartLabels)
      this.sr_chart_data.push(this.data_each_year[i].strike_rate);
    

    for(var i of this.lineChartLabels1)
      this.ba_chart_data.push(this.data_each_year[i].bat_avg);
    console.log(this.bat_pos);
    
    this.yearTabsStyles=Array(this.lineChartLabels.length).fill("nav-link")
    this.yearTabsStyles[0]="nav-link active"
  }

  bat_avg_problem(arr: string[], i: number){

    if(i>=this.lineChartLabels1.length){
      return;
    }
    var year = this.lineChartLabels1[i];
    if(this.data_each_year[year].dissmissals==0){
      this.lineChartLabels1.splice(i, 1);
      this.bat_avg_problem(this.lineChartLabels1, i);
    }
    else
      this.bat_avg_problem(this.lineChartLabels1, i+1);
  }

  push_in_sorted_order(arr: string[], year: string): string[] {
    
    if(arr.length==0 || year>arr[arr.length-1]){
      arr.push(year)
      return arr
    }

    for(var i=0;i<=arr.length-1;i++){
      if(arr[i]>year){
        arr.splice(i,0,year);
        return arr;
      }
    }
    return arr;
  }

  

  public lineChart1Options: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero:true
          }
      }]
    }
  };

  public lineChartLabels: string[] = [];
  public lineChart1Type: ChartType = 'line';
  public lineChart1Legend = true;
  public lineChart1Plugins = [];
  public lineChart1Data: ChartDataSets[] = [
    { data: this.ba_chart_data, label: 'Batting Average',backgroundColor:'rgba(167, 250, 112,0.5)',pointBackgroundColor:'rgba(0, 0, 1,1)' }
  ];

  public chart_or_data1=true
  public chartTabClass1 = "nav-link active"
  public dataTabClass1 ="nav-link"

  changeChartOrData1(choice:String){
    if(choice=="chart"){
      this.chart_or_data1 = true
      this.chartTabClass1 = "nav-link active"
      this.dataTabClass1="nav-link"
    }
    else if(choice=="data"){
      this.chart_or_data1=false
      this.dataTabClass1="nav-link active"
      this.chartTabClass1="nav-link"
    }
  }

  public lineChart2Options: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero:true
          }
      }]
    }
  };

  public lineChart2Type: ChartType = 'line';
  public lineChart2Legend = true;
  public lineChart2Plugins = [];
  public lineChart2Data: ChartDataSets[] = [
    { data: this.sr_chart_data, label: 'Strike Rate' ,backgroundColor:'rgba(89, 180, 201,0.5)',pointBackgroundColor:'rgba(0, 0, 0,1)'}
  ];
  // this.lineChart2Data[0].backgroundColor='rgba(89, 180, 201,0.5)';
  // this.barChartData[0].pointBackgroundColor='rgba(89, 180, 201,1)';

  public chart_or_data2=true
  public chartTabClass2 = "nav-link active"
  public dataTabClass2 ="nav-link"

  changeChartOrData2(choice:String){
    if(choice=="chart"){
      this.chart_or_data2 = true
      this.chartTabClass2 = "nav-link active"
      this.dataTabClass2="nav-link"
    }
    else if(choice=="data"){
      this.chart_or_data2=false
      this.dataTabClass2="nav-link active"
      this.chartTabClass2="nav-link"
    }
  }

  public currentYearIndex=0;

  switchYear(yearIndex:number){
    this.yearTabsStyles[this.currentYearIndex] = "nav-link"
    this.currentYearIndex = yearIndex;
    this.yearTabsStyles[this.currentYearIndex] = "nav-link active"
  }
  
}
