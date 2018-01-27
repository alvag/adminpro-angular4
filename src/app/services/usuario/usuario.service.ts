import { Injectable } from "@angular/core";
import { Usuario } from "../../models/usuario.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";

@Injectable()
export class UsuarioService {
    usuario: Usuario;
    token: string = "";

    constructor(private http: HttpClient, private router: Router) {
        this.token = localStorage.getItem("token");
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
    }

    saveUserData(token: string, usuario: Usuario) {
        localStorage.setItem("id", usuario._id);
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", JSON.stringify(usuario));

        this.usuario = usuario;
        this.token = token;
    }

    isAuth(): boolean {
        return this.token != null && this.token.length > 5;
    }

    registrarUsuario(usuario: Usuario) {
        let url = environment.API_URL + "usuario";

        return this.http.post(url, usuario).map((response: any) => {
            swal("Usuario creado", usuario.email, "success");
            return response.usuario;
        });
    }

    actualizarUsuario(usuario: Usuario) {
        let url = environment.API_URL + "usuario/" + usuario._id;

        let headers = new HttpHeaders({
            Authorization: "Bearer " + this.token,
            "Content-Type": "application/json"
        });

        return this.http
            .put(url, usuario, { headers: headers })
            .map((response: any) => {
                this.saveUserData(this.token, response.usuario);
                swal(
                    "Usuario Actualizado",
                    "Datos actualizados correctamente.",
                    "success"
                );
                return true;
            });
    }

    login(usuario: Usuario, recordar: boolean = false) {
        if (recordar) {
            localStorage.setItem("email", usuario.email);
        } else {
            localStorage.removeItem("email");
        }

        let url = environment.API_URL + "login";
        return this.http.post(url, usuario).map((response: any) => {
            this.saveUserData(response.token, response.usuario);
            return true;
        });
    }

    loginGoogle(token: string) {
        let url = environment.API_URL + "login/google";
        return this.http.post(url, { token }).map((response: any) => {
            this.saveUserData(response.token, response.usuario);
            return true;
        });
    }

    logOut() {
        this.usuario = null;
        this.token = "";
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        this.router.navigate(["/login"]);
    }
}
