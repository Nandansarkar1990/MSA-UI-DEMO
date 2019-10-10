declare var $:any;
import { Component, ViewEncapsulation, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import { STOCKS } from '../../service/shared';
import { ChartService } from '../../service/chart.service';

@Component({
  selector: 'app-bar-chart',
  encapsulation: ViewEncapsulation.None,
//   changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
    updatedColor: any;
    Data: any;
    jsonData = [];  
    multi: any[];
    currentTriggerdEvent: any;
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

    contextmenu = false;
    contextmenuX = 0;
    contextmenuY = 0;

    constructor(private chartData: ChartService, private cdr: ChangeDetectorRef) {
        
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

    onrightClick(event){
        event.preventDefault();
        console.log(event);
        this.contextmenuX=event.clientX
        this.contextmenuY=event.clientY
        this.contextmenu=true;
        this.currentTriggerdEvent = event;
    }

    // disableContextMenu(){
    //     this.contextmenu= false;
    // }

    receiveColorCode(event) {
        this.updatedColor = event;
        console.log("printed from bar chart"+ event);
        let currentIndex = this.getSelectedIndex();
        const colorScheme = this.colorScheme;
        const newColorScheme = {...colorScheme}
        newColorScheme.domain[currentIndex] = event;
        this.colorScheme = newColorScheme;
        this.contextmenu= false;
    }

    private getSelectedIndex() {
        let ele = document.getElementsByClassName('bar');
        console.log(this.currentTriggerdEvent);
        for(var i=0; i< ele.length; i++) {
            if(ele[i].outerHTML && this.currentTriggerdEvent.target) {
                if(ele[i].outerHTML === this.currentTriggerdEvent.target.outerHTML) {
                    return i;
                }
            }
        }
    }

    private drillDownData(event) {
        this.contextmenu= false;
        console.log("drillDown event" +event);
        let html = event.target.outerHTML;
        let el = $(html);
        let obj = {
            label: el.attr("aria-label"),
            text: el.text(),
            element: el.prop("tagName")
        };
        let selectedItem = obj.label;
        // this.chartData.updateChart();
        this.chartData.selectedVendor.next(selectedItem);
    }
}
