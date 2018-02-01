import { Medico } from "./../../models/medico.model";
import { Hospital } from "./../../models/hospital.model";
import { environment } from "./../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Usuario } from "../../models/usuario.model";

@Component({
    selector: "app-busqueda",
    templateUrl: "./busqueda.component.html",
    styles: []
})
export class BusquedaComponent implements OnInit {
    hospitales: Hospital[] = [];
    medicos: Medico[] = [];
    usuarios: Usuario[] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private http: HttpClient
    ) {
        activatedRoute.params.subscribe(params => {
            let q = params["q"];
            this.buscar(q);
        });
    }

    ngOnInit() {}

    buscar(q: string) {
        if (!q) {
            this.usuarios = [];
            this.medicos = [];
            this.hospitales = [];
        } else {
            let url = environment.API_URL + "busqueda/todo/" + q;
            this.http.get(url).subscribe((response: any) => {
                this.usuarios = response.usuarios.data;
                this.medicos = response.medicos.data;
                this.hospitales = response.hospitales.data;
            });
        }
    }
}
