import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ball } from 'src/app/player_pop_names';
import { PlayersService } from 'src/app/services/players.service';
import { ChartType, ChartOptions,ChartDataSets } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

interface runs_balls_sr{
  runs:number;
  balls:number;
  strike_rate:number;
}
interface DataEachYear{
  [keys:string]:{
    runs:number;
    balls:number;
    strike_rate:number;
    matches:string[];
    batting_team:string;
    bowling_team:string;
    fours:number;
    sixes:number;
    noballs:number;
    wides:number;
    dissmissals:number;
  }
}
export interface IHash {
  [details: string] : runs_balls_sr;
} 

@Component({
  selector: 'app-bats-vs-bowl-details',
  templateUrl: './bats-vs-bowl-details.component.html',
  styleUrls: ['./bats-vs-bowl-details.component.scss']
})


export class BatsVsBowlDetailsComponent implements OnInit {
  constructor(private route:ActivatedRoute,private _playerService:PlayersService) {
    monkeyPatchChartJsLegend();
    monkeyPatchChartJsTooltip();
   }

  public pieChartOptions1: ChartOptions = {
    responsive: true,
    legend:{
      position:"top",
      
    }
  };

  
  public pieChartLabels1: Label[] = [];
  public pieChartData1: number[] = [];

  public pieChartType1: ChartType = 'pie';
  public pieChartLegend1 = true;
  public pieChartPlugins1 = [];
  public donutColors1=[
    {
      backgroundColor: [
          'rgba(92, 184, 92,1)',
          'rgba(255, 195, 0, 1)',
          'rgba(217, 83, 79,1)',
          'rgba(129, 78, 40, 1)',
          'rgba(129, 199, 111, 1)'
    ]
    }
  ];
  public loading:boolean=true;
  
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
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Strike Rate' }
  ];

  public all_data!:Ball[];
  public batsman!:any;
  public bowler!:any;
  public ball_keys!:any;
  public ball_data:Ball[]=[];
  public inngs_arr:string[]=[];
  public runs:number=0;
  public balls:number=0;
  public fours:number=0;
  public sixes:number=0;
  public dissmissal:number=0;
  public wides:number=0;
  public noballs:number=0;
  public nvr_fcd_off:boolean=false;

  public data_by_match:IHash={};

  public data_each_year:DataEachYear={};
  public avg_strike_rate:number=0;
  public yearTabsStyles!:string[];

  
  push_in_sorted_order(arr:string[],ele:string){
    
    if(arr.length==0){
      arr.push(ele)
      return arr
    }

    for(var i=0;i<arr.length-1;i++){
      if(arr[i]<ele &&ele<arr[i+1]){
         arr.splice(i+1,0,ele)
         return arr
      }
    }
    if(ele<arr[0]){
      
      arr.splice(0,0,ele)
    }
    else if(ele>arr[arr.length-1]){
      
      arr.push(ele)

    }
    return arr
  }

  

  async ngOnInit(): Promise<void> {

    // getting batsman and bowler name from route 
    this.batsman=this.route.snapshot.paramMap.get("batsman")
    this.bowler=this.route.snapshot.paramMap.get("bowler")

    this.ball_data= await this._playerService.getBatsmanVsBowlerData(this.batsman,this.bowler)

    if(this.ball_data==null){
      this.loading=false
      this.nvr_fcd_off=true
      return
    }


      this.loading=false
        for(var data of this.ball_data){ 

        // checking if year is present in matches_each_year
          if(this.data_each_year[data.year]==undefined){
        
            this.data_each_year[data.year]=
            {
              runs:0,
              balls:0,
              strike_rate:0,
              matches:[],
              batting_team:data.batting_team,
              bowling_team:data.bowling_team,
              fours:0,
              sixes:0,
              dissmissals:0,
              noballs:0,
              wides:0
            }
            this.barChartLabels=this.push_in_sorted_order(this.barChartLabels,data.year)
            this.barChartData[0].data!.splice(this.barChartLabels.indexOf(data.year),0,0)
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
          
          // counting the balls
          this.data_by_match[data.match_id].balls++;
          this.balls++;
          this.data_each_year[data.year].balls++;
          
          // checking if bowler got a wicket in that ball
          if(data.wicket!=undefined){
              if(["bowled","lbw","caught","caught and bowled","stumped"].includes(data.wicket.kind)){
                this.dissmissal+=1
                this.data_each_year[data.year].dissmissals++
                if(this.pieChartLabels1.includes(data.wicket.kind)){
                  var index=this.pieChartLabels1.indexOf(data.wicket.kind)
                  this.pieChartData1[index]=this.pieChartData1[index]+1
                }
                else{
                  this.pieChartLabels1.push(data.wicket.kind)
                  this.pieChartData1.push(1)
                }
              }
          }

          
          // counting runs 
          this.runs+=data.runs.batsman
          this.data_by_match[data.match_id].runs+=data.runs.batsman
          this.data_each_year[data.year].runs+=data.runs.batsman
          
          // couting extras
          if(data.extras!=undefined){
            if(data.extras.wides!=undefined){
              this.wides+=1
              this.data_each_year[data.year].wides++
            }
            else if(data.extras.noballs!=undefined){
              this.noballs+=1
              this.data_each_year[data.year].noballs++
            }
          }

          // couting fours
          if(data.runs.batsman==4){
            this.fours+=1
            this.data_each_year[data.year].fours++

          }
          // couting sixes
          if(data.runs.batsman==6){
            this.sixes+=1
            this.data_each_year[data.year].sixes++

          }
          
      }
      // calculating strike for match
      for(var match of this.inngs_arr){

      this.data_by_match[match].strike_rate=(this.data_by_match[match].runs*100)/this.data_by_match[match].balls
    }
    

      // calculating strike rate each year
      var temp_strike_rate=0
      for(var year of this.barChartLabels){
        temp_strike_rate=0
        for(var match of this.data_each_year[year].matches){
          temp_strike_rate+=this.data_by_match[match].strike_rate
        }
        this.data_each_year[year].strike_rate=temp_strike_rate/this.data_each_year[year].matches.length
        this.barChartData[0].data![this.barChartLabels.indexOf(year)]=this.data_each_year[year].strike_rate
      }
      
      // calculating total strike rate
      temp_strike_rate=0
      for(var match of this.inngs_arr)
      {
        temp_strike_rate+=this.data_by_match[match].strike_rate
      }
      this.avg_strike_rate=temp_strike_rate/this.inngs_arr.length

      this.yearTabsStyles=Array(this.barChartLabels.length).fill("nav-link")
      this.yearTabsStyles[0]="nav-link active"
      this.barChartData[0].data!.push(0)
      this.loading=false
      this.barChartData[0].backgroundColor='rgba(89, 180, 201,1)'
  
  }


  public chart_or_data1=true
  public chartTabClass="nav-link active"
  public dataTabClass="nav-link"

  changeChartOrData(choice:string){
    if(choice=="chart"){
      this.chart_or_data1=true
      this.chartTabClass="nav-link active"
      this.dataTabClass="nav-link"
    }
    else if(choice=="data"){
      this.chart_or_data1=false
      this.dataTabClass="nav-link active"
      this.chartTabClass="nav-link"
    }

  }
  public chart_or_data2=true
  public chartTabClass2="nav-link active"
  public dataTabClass2="nav-link"

  changeChartOrData2(choice:string){
    if(choice=="chart"){
      this.chart_or_data2=true
      this.chartTabClass2="nav-link active"
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
    this.yearTabsStyles[this.currentYearIndex]="nav-link"
    this.currentYearIndex=yearIndex;
    this.yearTabsStyles[this.currentYearIndex]="nav-link active"
  }


}
