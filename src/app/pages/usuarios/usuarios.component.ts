import { environment } from "./../../../environments/environment";
import { UsuarioService } from "./../../services/service.index";
import { Usuario } from "./../../models/usuario.model";
import { Component, OnInit } from "@angular/core";
declare var swal: any;

@Component({
    selector: "app-usuarios",
    templateUrl: "./usuarios.component.html",
    styles: []
})
export class UsuariosComponent implements OnInit {
    usuarios: Usuario[] = [];
    pag: number = 1;
    cant: number = 10;
    paginacion: any;
    loading: boolean;

    constructor(public usuarioService: UsuarioService) {}

    ngOnInit() {
        this.getUsuarios();
    }

    getUsuarios(url?: string) {
        this.loading = true;
        if (!url) {
            url =
                environment.API_URL +
                "usuario?pag=" +
                this.pag +
                "&cant=" +
                this.cant;
        }
        this.usuarioService.getUsuarios(url).subscribe((response: any) => {
            this.loading = false;
            this.usuarios = response.usuarios;
            this.paginacion = response.paginacion;
        });
    }

    buscarUsuarios(busqueda: string) {
        let url;
        if (busqueda) {
            url =
                environment.API_URL +
                "busqueda/usuarios/" +
                busqueda +
                "?pag=" +
                this.pag +
                "&cant=" +
                this.cant;
        }

        this.getUsuarios(url);
    }

    borrarUsuario(usuario: Usuario) {
        swal({
            title: "¿Estás seguro?",
            text: "Estás a punto de borrar a " + usuario.nombre,
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then(deleted => {
            console.log(deleted);

            if (deleted) {
                this.usuarioService.borrarUsuario(usuario._id).subscribe(() => {
                    this.getUsuarios();
                });
            }
        });
    }

    actualizarUsuario(usuario: Usuario) {
        this.usuarioService.actualizarUsuario(usuario).subscribe();
    }
}
