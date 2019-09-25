import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../service/chart.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  Data: any;
  jsonData = [];
  // single = [
  //   {
  //     "name": "VeriFone Inc",
  //     "value": 2520678.7
  //   },
  //   {
  //     "name": "Creative Mobile Technologies, LLC",
  //     "value": 856750.11
  //   }
  // ];
  view: any[] = [630, 320];

  // options
  showLegend = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  constructor(private chartData: ChartService) {
  }
  ngOnInit() {
    this.chartData.getData()
      .subscribe((res) => {
        this.Data = res;
        console.log("bar chart data", this.Data)
        this.generateJson(this.Data.rows);
      });
  }

  private generateJson(rows) {
    this.jsonData = rows;

    this.jsonData = this.jsonData.map((data) => {
      data.name = data['vendor_name'];
      data.value = data['Total_Amount_CY'];
      return data;
    })
  };
  onSelect(event) {
    console.log(event);
  }

}
