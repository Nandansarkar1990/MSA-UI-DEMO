import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  single = [
    {
      "name": "VeriFone Inc",
      "value": 2520678.7
    },
    {
      "name": "Creative Mobile Technologies, LLC",
      "value": 856750.11
    }
  ];
  view: any[] = [630, 320];

  // options
  showLegend = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  constructor() {   
  }
  ngOnInit() {

  }
  onSelect(event) {
    console.log(event);
  }

}
