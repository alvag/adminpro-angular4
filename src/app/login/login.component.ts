import { UsuarioService } from "./../services/service.index";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Usuario } from "../models/usuario.model";

declare function init_plugins();

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
    recuerdame: boolean = false;
    email: string = localStorage.getItem("email");

    constructor(
        private router: Router,
        private usuarioService: UsuarioService
    ) {}

    ngOnInit() {
        init_plugins();

        if (this.email.length > 0) {
            this.recuerdame = true;
        }
    }

    ingresar(form: NgForm) {
        if (form.valid) {
            let usuario = new Usuario(
                null,
                form.value.email,
                form.value.password
            );
            this.usuarioService
                .login(usuario, form.value.recuerdame)
                .subscribe(response => this.router.navigate(["/dashboard"]));
        }
    }
}
