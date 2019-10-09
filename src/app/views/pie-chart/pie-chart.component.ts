import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../service/chart.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  Data: any;
  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;
  currentTriggerdEvent;

  jsonData = [];
  view: any[] = [630, 320];

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

  onrightClick(event){
    event.preventDefault();
    console.log(event);
    this.contextmenuX=event.clientX
    this.contextmenuY=event.clientY
    this.contextmenu=true;
    this.currentTriggerdEvent = event;
  }

  disableContextMenu(){
      this.contextmenu= false;
  }

  receiveColorCode(event) {
    console.log("printed from bar chart"+ event);
    var getcolorFromOUter = this.currentTriggerdEvent.target.outerHTML.split("fill")[1].split("=")[1].split(" ")[0].replace(/[\"]/g, "");
    this.currentTriggerdEvent.target.outerHTML = this.currentTriggerdEvent.target.outerHTML.replace(getcolorFromOUter, event);
    this.contextmenu= false;
  }
}
