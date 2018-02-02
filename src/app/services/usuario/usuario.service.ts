import { Injectable } from "@angular/core";
import { Usuario } from "../../models/usuario.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";
import { UploadService } from "../upload/upload.service";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UsuarioService {
    usuario: Usuario;
    token: string = "";
    menu: any[] = [];

    constructor(
        private http: HttpClient,
        private router: Router,
        private uploadService: UploadService
    ) {
        this.cargarStorage();
    }

    cargarStorage() {
        if (localStorage.getItem("token")) {
            this.token = localStorage.getItem("token");
            this.usuario = JSON.parse(localStorage.getItem("usuario"));
            this.menu = JSON.parse(localStorage.getItem("menu"));
        } else {
            this.token = "";
            this.usuario = null;
            this.menu = null;
        }
    }

    refreshToken() {
        let url = environment.API_URL + "login/refresh-token";

        let headers = new HttpHeaders({
            Authorization: "Bearer " + this.token,
            "Content-Type": "application/json"
        });

        return this.http
            .get(url, { headers: headers })
            .map((response: any) => {
                this.token = response.token;
                console.log(this.token);
                localStorage.setItem("token", this.token);
                return true;
            })
            .catch(err => {
                this.logOut();
                return Observable.throw(err);
            });
    }

    saveUserData(token: string, usuario: Usuario, menu: any) {
        localStorage.setItem("id", usuario._id);
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", JSON.stringify(usuario));
        localStorage.setItem("menu", JSON.stringify(menu));

        this.usuario = usuario;
        this.token = token;
        this.menu = menu;
    }

    isAuth(): boolean {
        return this.token != null && this.token.length > 5;
    }

    registrarUsuario(usuario: Usuario) {
        let url = environment.API_URL + "usuario";

        return this.http
            .post(url, usuario)
            .map((response: any) => {
                swal("Usuario creado", usuario.email, "success");
                return response.usuario;
            })
            .catch(err => {
                swal(err.error.mensaje, err.error.errors.message, "error");
                return Observable.throw(err);
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
                if (response.usuario._id === this.usuario._id) {
                    this.saveUserData(this.token, response.usuario, this.menu);
                }
                swal(
                    "Usuario Actualizado",
                    "Datos actualizados correctamente.",
                    "success"
                );
                return true;
            })
            .catch(err => {
                swal(err.error.mensaje, err.error.errors.message, "error");
                return Observable.throw(err);
            });
    }

    uploadImg(file: File, id: string) {
        this.uploadService
            .upload(file, "usuarios", id)
            .then((response: any) => {
                this.usuario.img = response.usuario.img;
                this.saveUserData(this.token, this.usuario, this.menu);
                swal(
                    "Foto Actualizada",
                    "La fotografía fue actualizada correctamente.",
                    "success"
                );
            })
            .catch(error => {
                console.log(error);
            });
    }

    login(usuario: Usuario, recordar: boolean = false) {
        if (recordar) {
            localStorage.setItem("email", usuario.email);
        } else {
            localStorage.removeItem("email");
        }

        let url = environment.API_URL + "login";
        return this.http
            .post(url, usuario)
            .map((response: any) => {
                this.saveUserData(
                    response.token,
                    response.usuario,
                    response.menu
                );
                return true;
            })
            .catch(err => {
                swal("Error en el login", err.error.mensaje, "error");
                return Observable.throw(err);
            });
    }

    loginGoogle(token: string) {
        let url = environment.API_URL + "login/google";
        return this.http.post(url, { token }).map((response: any) => {
            this.saveUserData(response.token, response.usuario, response.menu);
            return true;
        });
    }

    logOut() {
        this.usuario = null;
        this.token = "";
        this.menu = [];
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        localStorage.removeItem("menu");
        this.router.navigate(["/login"]);
    }

    getUsuarios(url: string) {
        return this.http.get(url);
    }

    borrarUsuario(id: string) {
        let url = environment.API_URL + "usuario/" + id;

        let headers = new HttpHeaders({
            Authorization: "Bearer " + this.token,
            "Content-Type": "application/json"
        });

        return this.http
            .delete(url, { headers: headers })
            .map((response: any) => {
                swal(
                    "Usuario Eliminado",
                    "El usuario ha sido eliminado de la base de datos.",
                    "success"
                );
                return true;
            });
    }
}
