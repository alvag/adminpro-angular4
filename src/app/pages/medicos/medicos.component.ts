import { Medico } from "./../../models/medico.model";
import { Component, OnInit } from "@angular/core";
import { environment } from "../../../environments/environment";
import {
    ModalUploadService,
    MedicoService
} from "../../services/service.index";
declare var swal: any;

@Component({
    selector: "app-medicos",
    templateUrl: "./medicos.component.html",
    styles: []
})
export class MedicosComponent implements OnInit {
    medicos: Medico[] = [];
    pag: number = 1;
    cant: number = 5;
    url: string;
    paginacion: any;
    loading: boolean;

    constructor(
        public modalUploadService: ModalUploadService,
        private medicoService: MedicoService
    ) {}

    ngOnInit() {
        this.cargarMedicos();
        this.modalUploadService.notificacion.subscribe(response =>
            // this.cargarMedicos(this.url)
            console.log(response)
        );
    }

    cargarMedicos(url?: string) {
        this.loading = true;
        if (!url) {
            this.url = environment.API_URL + "medico?pag=1&cant=" + this.cant;
        } else {
            this.url = url;
        }

        this.medicoService
            .cargarMedicos(this.url)
            .subscribe((response: any) => {
                this.pag = response.paginacion.curentPage;
                this.loading = false;
                this.medicos = response.medicos;
                this.paginacion = response.paginacion;
            });
    }

    buscarMedicos(busqueda: string) {
        if (busqueda) {
            this.url =
                environment.API_URL +
                "busqueda/medicos/" +
                busqueda +
                "?pag=" +
                this.pag +
                "&cant=" +
                this.cant;
        } else {
            this.url = environment.API_URL + "medico?pag=1&cant=" + this.cant;
        }

        this.cargarMedicos(this.url);
    }

    registrarMedico() {}

    editarMedico(medico: Medico) {}

    borrarMedico(medico: Medico) {
        swal({
            title: "¿Estás seguro?",
            text: "Estás a punto de borrar el médico: " + medico.nombre,
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then(deleted => {
            if (deleted) {
                this.medicoService.borrarMedico(medico._id).subscribe(() => {
                    this.cargarMedicos(this.url);
                });
            }
        });
    }
}
