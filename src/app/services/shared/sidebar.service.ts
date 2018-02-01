import { Injectable } from "@angular/core";
import { UsuarioService } from "../usuario/usuario.service";

@Injectable()
export class SidebarService {
    /* menu: any = [
        {
            titulo: "Principal",
            icono: "mdi mdi-gauge",
            submenu: [
                {
                    titulo: "Dhasboard",
                    url: "/dashboard"
                },
                {
                    titulo: "Progressbar",
                    url: "/progress"
                },
                {
                    titulo: "Gráficas",
                    url: "/graficas1"
                },
                {
                    titulo: "Promesas",
                    url: "/promesas"
                },
                {
                    titulo: "RXJS",
                    url: "/rxjs"
                }
            ]
        },
        {
            titulo: "Mantenimientos",
            icono: "md mdi-folder-lock-open",
            submenu: [
                {
                    titulo: "Usuarios",
                    url: "/usuarios"
                },
                {
                    titulo: "Hospitales",
                    url: "/hospitales"
                },
                {
                    titulo: "Médicos",
                    url: "/medicos"
                }
            ]
        }
    ]; */

    menu: any[] = [];

    constructor(public usuarioService: UsuarioService) {}

    cargarMenu() {
        this.menu = this.usuarioService.menu;
    }
}
