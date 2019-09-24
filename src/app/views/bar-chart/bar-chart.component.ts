import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import { STOCKS } from '../../service/shared';

@Component({
  selector: 'app-bar-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

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

    constructor() {
        
    }
    ngOnInit() {
        this.generateJson();
    }

    private generateJson() {
        for(var i=0; i< STOCKS.length; i++) {
            this.jsonData[i] = {'name' : STOCKS[i]['vendor_name'], 'value': STOCKS[i]['Total_Amount_CY']}
        }
        console.log(this.jsonData);
    };
    onSelect(event) {
        console.log(event);
    }


}
