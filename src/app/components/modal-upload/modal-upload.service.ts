import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class ModalUploadService {
    tipo: string;
    id: string;
    oculto: string = "oculto";
    notificacion = new EventEmitter<any>();

    constructor() {}

    ocultarModal() {
        this.oculto = "oculto";
        this.tipo = null;
        this.id = null;
    }

    mostrarModal(tipo: string, id: string) {
        this.oculto = "";
        this.id = id;
        this.tipo = tipo;
    }
}
