import { Component, OnInit } from '@angular/core';

export interface ISisifoAnalysis{
  name: string;
  endpoints: IEndpoint[];
  severity: string;
  description: string;
  cwe: number;
}
export interface IEndpoint {
  url: string;
  method: string;
}

@Component({
  selector: 'app-sisifo',
  templateUrl: './sisifo.component.html',
  styleUrls: ['./sisifo.component.scss']
})
export class SisifoComponent implements OnInit {
  analsysisResponse: ISisifoAnalysis[];
  constructor() { }
  
  public show = false;
  public prueba : string;  

  ngOnInit() {
    this.analsysisResponse = [
    { name: "Atlas", endpoints: [ { url: "https://google.com/hola", method: "Get" }], severity: "Critical", description: "Sql Inyection", cwe: 1 },
    { name: "Atlas", endpoints: [ { url: "https://google.com/adios", method: "Get" }], severity: "Alta", description: "Sql Inyection", cwe: 2 },
    { name: "Atlas", endpoints: [ { url: "https://facebook.com/login", method: "Post" }], severity: "Critical", description: " clickjacking", cwe: 31 },
    { name: "Atlas", endpoints: [ { url: "https://marca.es/", method: "Get" }], severity: "Critical", description: "Sql Inyection", cwe: 22 },
    { name: "Atlas", endpoints: [ { url: "https://incibe.es", method: "Get" }], severity: "Alta", description: "Sql Inyection", cwe: 65 },
    { name: "Atlas", endpoints: [ { url: "https://cybercamp.es/competiciones/hackathon", method: "Get" }], severity: "Critical", description: "Cross-Site-Scripting", cwe: 25 },
    { name: "Atlas", endpoints: [ { url: "https://twitter.com/", method: "Get" }], severity: "Critical", description: "Sql Inyection", cwe: 3 }
  ]

  }

  mostrarTabla(){
    this.show = true;
  }

}
