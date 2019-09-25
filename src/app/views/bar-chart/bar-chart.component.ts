import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import { STOCKS } from '../../service/shared';
import { ChartService } from '../../service/chart.service';

@Component({
  selector: 'app-bar-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
    Data: any;
    jsonData = [];  
    multi: any[];

    view: any[] = [300, 320];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = false;
    showXAxisLabel = true;
    xAxisLabel = 'Vendor';
    showYAxisLabel = true;
    yAxisLabel = 'Total_Amount_CY';

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    constructor(private chartData: ChartService) {
        
    }
    ngOnInit() {
        this.chartData.getData().subscribe((res)=>{
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
