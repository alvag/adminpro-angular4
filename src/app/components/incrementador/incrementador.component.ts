import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";

@Component({
    selector: "app-incrementador",
    templateUrl: "./incrementador.component.html",
    styles: []
})
export class IncrementadorComponent implements OnInit {

    @ViewChild("txtProgress") txtProgress: ElementRef;

    @Input("leyenda") leyenda = "Leyenda";
    @Input("progreso") progreso = 50;

    @Output() cambioValor: EventEmitter<number> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    onChanges(valor: number) {

        // let elemHTML: any = document.getElementsByName("progreso")[ 0 ];

        this.progreso = valor;
        if (valor >= 100) this.progreso = 100;
        if (valor <= 0) this.progreso = 0;

        // elemHTML.value = this.progreso;

        this.txtProgress.nativeElement.valueInSpecifiedUnits = this.progreso;

        this.cambioValor.emit(this.progreso);
    }

    cambiarValor(valor: number) {
        this.progreso += valor;
        if (this.progreso >= 100) this.progreso = 100;
        if (this.progreso <= 0) this.progreso = 0;

        this.cambioValor.emit(this.progreso);

        this.txtProgress.nativeElement.focus();
    }

}
