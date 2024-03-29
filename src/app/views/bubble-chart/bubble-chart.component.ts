import { Component, OnInit, ValueProvider } from '@angular/core';

import * as d3 from 'd3'
import { ChartService } from '../../service/chart.service';



@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.scss']
})
export class BubbleChartComponent implements OnInit {
  Data: any;
  jsonData = [];
  finalData: any;
  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;
  currentTriggerdEvent;
  
  constructor(private chartData: ChartService) {
    
  }

  ngOnInit() {
    this.chartData.getData().subscribe((res: any) => {
      // this.Data = res;
      //   console.log("bar chart data", this.Data);
      this.generateJson(res.rows)
      this.createChart(this.finalData);
    });
  }

  private generateJson(rows) {
    this.jsonData = rows;
    let tempData = this.jsonData.map((data) => {
      data.Name = data['vendor_name'];
      data.Count = data['Total_Amount_CY'];
      return data;
    })
    this.finalData = {
      'children': tempData
    }
    console.log("final data ", this.finalData)
  };

  createChart(data) {
    var that = this;
    var diameter = 300;
    var color = d3.scaleOrdinal().range(d3.schemeAccent);

    var bubble = d3.pack(data)
      .size([diameter, diameter])
      .padding(1.5);

    var svg = d3.select("#bubble")
      .append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .attr("class", "bubble");

    var nodes = d3.hierarchy(data)
      .sum(function (d) { return d.Count; });

    var node = svg.selectAll(".node")
      .data(bubble(nodes).descendants())
      .enter()
      .filter(function (d) {
        return !d.children
      })
      .append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });

    // node.append("title")
    //   .text(function (d) {
    //     return d.Name + ": " + d.Count;
    //   });

    node.append("circle")
      .attr("r", function (d) {
        return d.r;
      })
      .style("fill", function (d, i) {
        return color(i);
      });

    node.append("text")
      .attr("dy", ".2em")
      .style("text-anchor", "middle")
      .text(function (d) {
        return d.data.Name.substring(0, d.r / 3);
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", function (d) {
        return d.r / 5;
      })
      .attr("fill", "white");

    node.append("text")
      .attr("dy", "1.3em")
      .style("text-anchor", "middle")
      .text(function (d) {
        return d.data.Count;
      })
      .attr("font-family", "Gill Sans", "Gill Sans MT")
      .attr("font-size", function (d) {
        return d.r / 5;
      })
      .attr("fill", "white");

    d3.select(self.frameElement)
      .style("height", diameter + "px");
    svg.on('contextmenu', function(){ 
      d3.event.preventDefault();
      that.onrightClick(d3.event);
    });
  }

  onrightClick(event){
    event.preventDefault();
    console.log(event);
    this.contextmenuX=200;
    this.contextmenuY=200;
    this.contextmenu=true;
    this.currentTriggerdEvent = event;
  }

  disableContextMenu(){
      this.contextmenu= false;
  }

  receiveColorCode(event) {
    console.log(event);
    console.log("printed from bubble chart"+ event);
    var getcolorFromOUter =  this.currentTriggerdEvent.target.outerHTML.split(":")[1].split(">")[0].replace(/[\"]/g, "");
    this.currentTriggerdEvent.target.outerHTML = this.currentTriggerdEvent.target.outerHTML.replace(getcolorFromOUter, event);
    this.contextmenu= false;
  }

}
