import { Injectable } from "@angular/core";
import { Usuario } from "../../models/usuario.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable()
export class UsuarioService {
    usuario: Usuario;
    token: string;

    constructor(private http: HttpClient) {}

    saveUserData(token: string, usuario: Usuario) {
        localStorage.setItem("id", usuario._id);
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", JSON.stringify(usuario));

        this.usuario = usuario;
        this.token = token;
    }

    registrarUsuario(usuario: Usuario) {
        let url = environment.API_URL + "usuario";

        return this.http.post(url, usuario).map((response: any) => {
            swal("Usuario creado", usuario.email, "success");
            return response.usuario;
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
}
