import { Usuario } from "./../../models/usuario.model";
import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "../../services/service.index";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styles: []
})
export class ProfileComponent implements OnInit {
    usuario: Usuario;

    constructor(private usuarioService: UsuarioService) {}

    ngOnInit() {
        this.usuario = this.usuarioService.usuario;
    }

    actualizar() {
        this.usuarioService.actualizarUsuario(this.usuario).subscribe();
    }
}
