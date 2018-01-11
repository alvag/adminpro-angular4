import { Injectable } from "@angular/core";

@Injectable()
export class SettingsService {

    ajustes: Ajustes = {
        temaUrl: "assets/css/colors/default-dark.css",
        tema: "default-dark"
    };

    constructor() {
        this.cargarAjustes();
    }

    guardarAjustes() {
        localStorage.setItem("ajustes", JSON.stringify(this.ajustes));
    }

    cargarAjustes() {
        if (localStorage.getItem("ajustes")) {
            this.ajustes = JSON.parse(localStorage.getItem("ajustes"));
        }

        this.aplicarTema(this.ajustes.tema);
    }

    aplicarTema(tema: string) {
        let url: string = "assets/css/colors/" + tema + ".css";
        document.getElementById("theme").setAttribute("href", url);

        this.ajustes.tema = tema;
        this.ajustes.temaUrl = url;

        this.guardarAjustes();
    }

}


interface Ajustes {
    temaUrl: string;
    tema: string;
}
