import { Component, OnInit } from '@angular/core';
//import * as Chartist from 'chartist';
import { ChartDataSets, ChartOptions,ChartType } from 'chart.js';
import { SingleDataSet, Label, Color, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

   public pieChartOptions: ChartOptions = {
    responsive: true,
    };

    constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();

  }

  public options: ChartType;
  public verSeleccion: string        = '';
  public seleccion : ChartType = 'pie';
  // Pie


  public pieChartLabels: Label[]
  public pieChartData: SingleDataSet
  public pieChartType: ChartType
  public chartReady = true;
  public pieChartLegend = true;
  public pieChartPlugins = []

 ngOnInit(){
  this.pintargrafica();

 }
 pintargrafica(){
 //this.pieChartOptions: ChartOptions = {
 // responsive: true,
 //};
  this.pieChartLabels = [['Acunetix'], ['Nessus'], ['Sisifo'], ['Resto']];
  this.pieChartData = [23,10, 55, 45];
  this.pieChartType = this.seleccion;
  this.chartReady = true;
  this.pieChartLegend = true;
  this.pieChartPlugins = []

 }

  cambiagrafico(options){
    this.seleccion = options;
    this.pieChartType = this.seleccion;
  }

}
