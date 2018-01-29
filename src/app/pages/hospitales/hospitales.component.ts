import { Hospital } from "./../../models/hospital.model";
import { Component, OnInit } from "@angular/core";
import { environment } from "../../../environments/environment";
import {
    HospitalService,
    ModalUploadService
} from "../../services/service.index";
declare var swal: any;

@Component({
    selector: "app-hospitales",
    templateUrl: "./hospitales.component.html",
    styles: []
})
export class HospitalesComponent implements OnInit {
    hospitales: Hospital[] = [];
    pag: number = 1;
    cant: number = 5;
    url: string;
    paginacion: any;
    loading: boolean;

    constructor(
        private hospitalService: HospitalService,
        public modalUploadService: ModalUploadService
    ) {}

    ngOnInit() {
        this.cargarHospitales();
        this.modalUploadService.notificacion.subscribe(response =>
            this.cargarHospitales(this.url)
        );
    }

    mostrarModal(id: string) {
        this.modalUploadService.mostrarModal("hospitales", id);
    }

    registrarHospital() {
        swal("Nombre del Hospital:", {
            buttons: ["Cancelar", "Aceptar"],
            content: "input"
        }).then(value => {
            if (value) {
                let hospital = new Hospital(value);
                this.hospitalService
                    .registrarHospital(hospital)
                    .subscribe(() => this.cargarHospitales());
            }
        });
    }

    cargarHospitales(url?: string) {
        this.loading = true;
        if (!url) {
            this.url = environment.API_URL + "hospital?pag=1&cant=" + this.cant;
        } else {
            this.url = url;
        }
        this.hospitalService
            .cargarHospitales(this.url)
            .subscribe((response: any) => {
                this.pag = response.paginacion.curentPage;
                this.loading = false;
                this.hospitales = response.hospitales;
                this.paginacion = response.paginacion;
            });
    }

    actualizarHospital(hospital: Hospital) {
        this.hospitalService.actualizarHospital(hospital).subscribe();
    }

    borrarHospital(hospital: Hospital) {
        swal({
            title: "¿Estás seguro?",
            text: "Estás a punto de borrar el hospital: " + hospital.nombre,
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then(deleted => {
            if (deleted) {
                this.hospitalService
                    .borrarHospital(hospital._id)
                    .subscribe(() => {
                        this.cargarHospitales(this.url);
                    });
            }
        });
    }

    buscarHospitales(busqueda: string) {
        if (busqueda) {
            this.url =
                environment.API_URL +
                "busqueda/hospitales/" +
                busqueda +
                "?pag=" +
                this.pag +
                "&cant=" +
                this.cant;
        } else {
            this.url = environment.API_URL + "hospital?pag=1&cant=" + this.cant;
        }

        this.cargarHospitales(this.url);
    }
}
