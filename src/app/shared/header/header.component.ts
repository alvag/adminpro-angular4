import { UsuarioService } from "./../../services/service.index";
import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../models/usuario.model";
import { Router } from "@angular/router";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styles: []
})
export class HeaderComponent implements OnInit {
    usuario: Usuario;
    constructor(
        private router: Router,
        public usuarioService: UsuarioService
    ) {}

    ngOnInit() {
        this.usuario = this.usuarioService.usuario;
    }

    buscar(busqueda: string) {
        this.router.navigate(["/busqueda", busqueda]);
    }
}
