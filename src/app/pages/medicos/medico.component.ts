import { Hospital } from "./../../models/hospital.model";
import { Medico } from "./../../models/medico.model";
import {
    HospitalService,
    MedicoService,
    ModalUploadService
} from "./../../services/service.index";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { environment } from "../../../environments/environment";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-medico",
    templateUrl: "./medico.component.html",
    styles: []
})
export class MedicoComponent implements OnInit {
    hospitales: Hospital[] = [];
    medico: Medico = new Medico("", "", "", "", "");
    hospital: Hospital = new Hospital("");

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private hospitalService: HospitalService,
        private medicoService: MedicoService,
        public modalUploadService: ModalUploadService
    ) {
        route.params.subscribe(params => {
            let id = params["id"];
            if (id !== "nuevo") {
                this.obtenerMedico(id);
            }
        });
    }

    ngOnInit() {
        let url = environment.API_URL + "hospital";
        this.hospitalService
            .cargarHospitales(url)
            .subscribe((response: any) => {
                this.hospitales = response.hospitales;
            });

        this.modalUploadService.notificacion.subscribe(response => {
            this.medico.img = response.medico.img;
        });
    }

    obtenerMedico(id: string) {
        let url = environment.API_URL + "medico/" + id;
        this.medicoService.cargarMedicos(url).subscribe((response: any) => {
            Object.assign(this.medico, response.medico);
            Object.assign(this.hospital, response.medico.hospital);
            this.medico.hospital = response.medico.hospital._id;
            this.medico.usuario = response.medico.usuario._id;
        });
    }

    guardarMedico(f: NgForm) {
        if (f.valid) {
            this.medicoService
                .guardarMedico(this.medico)
                .subscribe((medico: Medico) => {
                    this.medico = medico;
                    this.router.navigate(["/medico", medico._id]);
                });
        }
    }

    onSelectHospital(id: string) {
        let index = this.hospitales.findIndex(x => x._id === id);
        this.hospital = this.hospitales[index];
    }

    cambiarFoto() {
        this.modalUploadService.mostrarModal("medicos", this.medico._id);
    }
}
