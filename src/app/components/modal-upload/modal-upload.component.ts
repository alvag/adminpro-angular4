import { Component, OnInit } from "@angular/core";
import {
    UploadService,
    ModalUploadService
} from "../../services/service.index";

@Component({
    selector: "app-modal-upload",
    templateUrl: "./modal-upload.component.html",
    styles: []
})
export class ModalUploadComponent implements OnInit {
    img: File;
    imgTemp: string;

    constructor(
        private uploadService: UploadService,
        public modalUploadService: ModalUploadService
    ) {}

    ngOnInit() {}

    cerrarModal() {
        this.imgTemp = null;
        this.img = null;
        this.modalUploadService.ocultarModal();
    }

    selectImg(file: File) {
        if (file) {
            if (file.type.indexOf("image") < 0) {
                swal(
                    "Sólo imágenes",
                    "El archivo seleccionado no es una imagen.",
                    "error"
                );
                return;
            }
            this.img = file;

            let reader = new FileReader();
            let urlTemp = reader.readAsDataURL(file);
            reader.onloadend = () => (this.imgTemp = reader.result);
        }
    }

    subirImagen() {
        this.uploadService
            .upload(
                this.img,
                this.modalUploadService.tipo,
                this.modalUploadService.id
            )
            .then(response => {
                this.modalUploadService.notificacion.emit(response);
                this.cerrarModal();
            })
            .catch(err => {
                console.log(err);
            });
    }
}
