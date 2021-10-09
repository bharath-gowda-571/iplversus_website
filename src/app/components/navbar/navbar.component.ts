import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public styles:string[]=Array(3).fill("nav-item")
  public currentIndex:number=0;
  constructor(private _router:Router) {
    // console.log(this._router.url)
   }

  ngOnInit(): void {
    // console.log(this._router.url)
  }
  
  switchStyleOfNavs(choice:number){
    // console.log(this._router.url)

    switch(choice){
      case 0:
        this.styles.fill("nav-item")
        this.styles[0]="nav-item active"
        this.currentIndex=0
        break
      case 1:
          this.styles.fill("nav-item")
          this.styles[1]="nav-item active"
          this.currentIndex=1
          break
      case 2:
          this.styles.fill("nav-item")
          this.styles[2]="nav-item active"
          this.currentIndex=2
          break
      
    }
  }
}
