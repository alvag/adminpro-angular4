import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
// import { clearInterval } from "timers";

@Component({
    selector: "app-rxjs",
    templateUrl: "./rxjs.component.html",
    styles: []
})
export class RxjsComponent implements OnInit {
    constructor() {
        let obs = new Observable(observer => {
            let contador = 0;
            let intervalo = setInterval(() => {
                contador++;
                observer.next(contador);

                if (contador === 3) {
                    observer.complete();
                }
            }, 1000);
        });

        obs.subscribe(
            numero => console.log("subs", numero),
            error => console.log("Error", error),
            () => console.log("El observador terminó!")
        );
    }

    ngOnInit() {}
}
