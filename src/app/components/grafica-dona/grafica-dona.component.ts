import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-grafica-dona",
    templateUrl: "./grafica-dona.component.html",
    styles: []
})
export class GraficaDonaComponent implements OnInit {

    @Input("chartType") chartType: string = "";
    @Input("chartLabels") chartLabels: string[] = [];
    @Input("chartData") chartData: number[] = [];

    constructor() { }

    ngOnInit() {
    }

}
