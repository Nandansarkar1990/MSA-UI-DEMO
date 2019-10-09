import { Component } from '@angular/core';
// import { cdkDrag } from '@angular/cdk/drag-drop';


@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {
  public userName = 'vishal';
  public password = 'Aug@2019';
  lineWidth = 400;
  lineHeight = 200;
  constructor() { }

  ngOnInit() {
    
  }

  
}