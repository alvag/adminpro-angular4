import { Component, OnInit } from "@angular/core";
import { containsTree } from "@angular/router/src/url_tree";

@Component({
    selector: "app-promesas",
    templateUrl: "./promesas.component.html",
    styles: []
})
export class PromesasComponent implements OnInit {
    constructor() {
        this.contarTres()
            .then(resolve => console.log("Terminó", resolve))
            .catch(error => console.log("error!", error));
    }

    ngOnInit() {}

    contarTres(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let contador = 0;
            let intervalo = setInterval(() => {
                contador++;
                console.log(contador);

                if (contador === 3) {
                    clearInterval(intervalo);
                    resolve(true);
                }
            }, 1000);
        });
    }
}
