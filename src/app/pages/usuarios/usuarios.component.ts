import { Component, OnInit } from "@angular/core";
import { environment } from "./../../../environments/environment";
import {
    UsuarioService,
    ModalUploadService
} from "./../../services/service.index";
import { Usuario } from "./../../models/usuario.model";
declare var swal: any;

@Component({
    selector: "app-usuarios",
    templateUrl: "./usuarios.component.html",
    styles: []
})
export class UsuariosComponent implements OnInit {
    usuarios: Usuario[] = [];
    pag: number = 1;
    cant: number = 5;
    url: string;
    paginacion: any;
    loading: boolean;

    constructor(
        public usuarioService: UsuarioService,
        public modalUploadService: ModalUploadService
    ) {}

    ngOnInit() {
        this.getUsuarios();
        this.modalUploadService.notificacion.subscribe(response =>
            this.getUsuarios(this.url)
        );
    }

    mostrarModal(id: string) {
        this.modalUploadService.mostrarModal("usuarios", id);
    }

    getUsuarios(url?: string) {
        this.loading = true;
        if (!url) {
            this.url = environment.API_URL + "usuario?pag=1&cant=" + this.cant;
        } else {
            this.url = url;
        }
        this.usuarioService.getUsuarios(this.url).subscribe((response: any) => {
            this.pag = response.paginacion.curentPage;
            this.loading = false;
            this.usuarios = response.usuarios;
            this.paginacion = response.paginacion;
        });
    }

    buscarUsuarios(busqueda: string) {
        if (busqueda) {
            this.url =
                environment.API_URL +
                "busqueda/usuarios/" +
                busqueda +
                "?pag=" +
                this.pag +
                "&cant=" +
                this.cant;
        } else {
            this.url = environment.API_URL + "usuario?pag=1&cant=" + this.cant;
        }

        this.getUsuarios(this.url);
    }

    borrarUsuario(usuario: Usuario) {
        swal({
            title: "¿Estás seguro?",
            text: "Estás a punto de borrar a " + usuario.nombre,
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then(deleted => {
            if (deleted) {
                this.usuarioService.borrarUsuario(usuario._id).subscribe(() => {
                    this.getUsuarios(this.url);
                });
            }
        });
    }

    actualizarUsuario(usuario: Usuario) {
        this.usuarioService.actualizarUsuario(usuario).subscribe();
    }
}
