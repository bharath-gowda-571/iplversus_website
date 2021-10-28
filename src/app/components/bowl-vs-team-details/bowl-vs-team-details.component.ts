import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayersService } from 'src/app/services/players.service';
import {push_in_sorted_order} from '../../random_ops';
import { ChartType, ChartOptions,ChartDataSets } from 'chart.js';
// import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';


interface BestFigure{
  wickets:number,
  runs:number,
  economy:number
}

interface DataByYear{
  [keys:string]:{
  balls:number,
  runs:number,
  wickets:number,
  overs:string,
  wides:number,
  noballs:number,
  bestFigure:BestFigure,
  sixes:number,
  fours:number,
  avg_economy:number,
  innings:number
}
}


@Component({
  selector: 'app-bowl-vs-team-details',
  templateUrl: './bowl-vs-team-details.component.html',
  styleUrls: ['./bowl-vs-team-details.component.scss']
})


export class BowlVsTeamDetailsComponent implements OnInit {
  public bowler:any;
  public team:any;
  public data:any;
  public loading:boolean=true;
  public nvr_fcd_off=false;
  public balls:number=0;
  public runs:number=0;
  public wickets:number=0;
  public wides:number=0;
  public noballs:number=0;
  public sixes:number=0;
  public fours:number=0;
  public overs!:string;
  public avg_economy!: number;
  public best_figure!:BestFigure;
  public data_by_year:DataByYear={};
  
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero:true
          }
      }]
  }
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'line';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Average Economy' }
  ];
  public yearTabsStyles!:string[];

  constructor(private route:ActivatedRoute,public _playerService:PlayersService) { }


  async ngOnInit(): Promise<void> {
    // getting bowler and team name from route 
    this.bowler=this.route.snapshot.paramMap.get("bowler")
    this.team=this.route.snapshot.paramMap.get("team")

    
    this.data= await this._playerService.getBowlerVsTeamData(this.bowler,this.team);
    if(this.data==null){
      this.nvr_fcd_off=true
      this.loading=false
      return
    }
    this.best_figure={
      wickets:0,
      runs:Infinity,
      economy:Infinity
    }

    var temp_economy=0;
    for(var inning of this.data){

    
      
      if(this.data_by_year[inning.year]==undefined){
        

        this.barChartLabels=push_in_sorted_order(this.barChartLabels,inning.year)
        this.data_by_year[inning.year]={
          balls:0,
          runs:0,
          wickets:0,
          avg_economy:0,
          fours:0,
          sixes:0,
          noballs:0,
          wides:0,
          bestFigure:{
            wickets:0,
            runs:Infinity,
            economy:Infinity,
          },
          innings:0,
          overs:'0.0'
        }
      }
  
      this.data_by_year[inning.year].innings+=1
      
      this.balls+=inning.balls
      this.data_by_year[inning.year].balls+=inning.balls

      this.runs+=inning.runs
      this.data_by_year[inning.year].runs+=inning.runs

      this.wides+=inning.wides
      this.data_by_year[inning.year].wides+=inning.wides

      this.wickets+=inning.wickets
      this.data_by_year[inning.year].wickets+=inning.wickets

      this.noballs+=inning.noballs
      this.data_by_year[inning.year].noballs+=inning.noballs

      this.sixes+=inning.sixes
      this.data_by_year[inning.year].sixes+=inning.sixes

      this.fours+=inning.fours
      this.data_by_year[inning.year].fours+=inning.fours

      temp_economy+=inning.economy

      this.data_by_year[inning.year].avg_economy+=inning.economy

      // checking for bowler's best figure in that year

      if(this.data_by_year[inning.year].bestFigure.wickets<inning.wickets)
      {
        this.data_by_year[inning.year].bestFigure={
          wickets:inning.wickets,
          runs:inning.runs,
          economy:inning.economy
        };
      }
      else if(this.data_by_year[inning.year].bestFigure.wickets==inning.wickets){
        if(this.data_by_year[inning.year].bestFigure.runs>inning.runs){
          this.data_by_year[inning.year].bestFigure={
            wickets:inning.wickets,
            runs:inning.runs,
            economy:inning.economy
          };
        }
        else if(this.data_by_year[inning.year].bestFigure.runs==inning.runs){
          if(this.data_by_year[inning.year].bestFigure.economy>inning.economy){
            this.data_by_year[inning.year].bestFigure={
              wickets:inning.wickets,
              runs:inning.runs,
              economy:inning.economy
            };
          }
        }
      }

      // checking for bowler's best figure
      if(this.best_figure.wickets<inning.wickets){
        this.best_figure={
          wickets:inning.wickets,
          runs:inning.runs,
          economy:inning.economy
        }
      }
      else if(this.best_figure.wickets==this.wickets){
        if(this.best_figure.runs>inning.runs){
          this.best_figure={
            wickets:inning.wickets,
            runs:inning.runs,
            economy:inning.economy
          }
        }
        else if(this.best_figure.runs==inning.runs){
          if(this.best_figure.economy>inning.economy){
            this.best_figure={
              wickets:inning.wickets,
              runs:inning.runs,
              economy:inning.economy
            }
          }
          
        }
      }

    }

    for(var year of this.barChartLabels){
      this.data_by_year[year].avg_economy/=this.data_by_year[year].innings
      this.data_by_year[year].overs=Math.trunc(this.data_by_year[year].balls/6).toString()+"."+(this.data_by_year[year].balls%6).toString()
      this.barChartData[0].data?.push(this.data_by_year[year].avg_economy)
    }
    console.log(this.barChartData)
    this.overs=Math.trunc(this.balls/6).toString()+"."+(this.balls%6).toString()
    
    this.avg_economy=temp_economy/this.data.length
    this.loading=false
    this.yearTabsStyles=Array(this.barChartLabels.length).fill("nav-link")
    this.yearTabsStyles[0]="nav-link active"

  }
  public chart_or_data=true
  public chartTabClass='nav-link active'
  public dataTabClass='nav-link'
  changeChartOrData(choice:string){
    if(choice=="chart"){
      this.chart_or_data=true
      this.chartTabClass="nav-link active"
      this.dataTabClass="nav-link"
    }
    else if(choice=="data"){
      this.chart_or_data=false
      this.dataTabClass="nav-link active"
      this.chartTabClass="nav-link"
    }

  }
  public currentYearIndex=0;
  
  switchYear(yearIndex:number){
    this.yearTabsStyles[this.currentYearIndex]="nav-link"
    this.currentYearIndex=yearIndex;
    this.yearTabsStyles[this.currentYearIndex]="nav-link active"
  }
}
