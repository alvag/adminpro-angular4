import { environment } from "./../../environments/environment";
import { UsuarioService } from "./../services/service.index";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Usuario } from "../models/usuario.model";

declare function init_plugins();
declare const gapi: any;

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
    recuerdame: boolean = false;
    email: string;

    auth2: any;

    constructor(
        private router: Router,
        private usuarioService: UsuarioService
    ) {
        this.email = localStorage.getItem("email");
    }

    ngOnInit() {
        init_plugins();
        this.googleInit();

        if (this.email && this.email.length > 0) {
            this.recuerdame = true;
        }
    }

    googleInit() {
        gapi.load("auth2", () => {
            this.auth2 = gapi.auth2.init({
                client_id: environment.GOOGLE_CLIENT_ID,
                cookiepolicy: "single_host_origin",
                scope: "profile email"
            });

            this.attachSignIn(document.getElementById("btnGoogle"));
        });
    }

    attachSignIn(element) {
        this.auth2.attachClickHandler(element, {}, googleUser => {
            // let profile = googleUser.getBasicProfile();
            let token = googleUser.getAuthResponse().id_token;
            this.usuarioService
                .loginGoogle(token)
                .subscribe(() => (window.location.href = "/dashboard"));
        });
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
                .subscribe(() => this.router.navigate(["/dashboard"]));
        }
    }
}
