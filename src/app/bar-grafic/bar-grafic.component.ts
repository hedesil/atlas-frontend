import {Component, Input, OnInit} from '@angular/core';
//import * as Chartist from 'chartist';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {SingleDataSet, Label, Color, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip} from 'ng2-charts';

@Component({
  selector: 'app-bar-grafic',
  templateUrl: './bar-grafic.component.html',
  styleUrls: ['./bar-grafic.component.scss']
})
export class BarGraficComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };


  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  public options: ChartType;
  public verSeleccion: string = '';
  public seleccion: ChartType = 'bar';
  // Pie


  public pieChartLabels: Label[];
  public pieChartData: SingleDataSet;
  public pieChartType: ChartType;
  public chartReady = true;
  public pieChartLegend = true;
  public pieChartPlugins = [];

  ngOnInit() {

    this.pintargrafica();

  }

  pintargrafica() {
    //this.pieChartOptions: ChartOptions = {
    // responsive: true,
    //};
    this.pieChartLabels = [['Riesgo', 'Critico'], ['Riesgo', 'Alto'], ['Riesgo', 'Medio'], ['Riesgo', 'Bajo']];
    this.pieChartData = [4, 9, 17, 35];
    this.pieChartType = this.seleccion;
    this.chartReady = true;
    this.pieChartLegend = true;
    this.pieChartPlugins = [];
  }

  cambiagrafico(options) {
    this.seleccion = options;
    this.pieChartType = this.seleccion;
  }
}
