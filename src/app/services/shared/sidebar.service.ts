import { Injectable } from "@angular/core";

@Injectable()
export class SidebarService {
    menu: any = [
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
        }
    ];

    constructor() {}
}
