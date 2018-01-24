import { Injectable } from "@angular/core";
import { Usuario } from "../../models/usuario.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable()
export class UsuarioService {
    constructor(private http: HttpClient) {}

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
            localStorage.setItem("id", response.usuario._id);
            localStorage.setItem("token", response.token);
            localStorage.setItem("usuario", JSON.stringify(response.usuario));
            return true;
        });
    }
}
