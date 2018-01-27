import { Usuario } from "./../../models/usuario.model";
import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "../../services/service.index";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styles: []
})
export class ProfileComponent implements OnInit {
    usuario: Usuario;
    img: File;
    imgTemp: string;

    constructor(private usuarioService: UsuarioService) {}

    ngOnInit() {
        this.usuario = this.usuarioService.usuario;
    }

    actualizar() {
        this.usuarioService.actualizarUsuario(this.usuario).subscribe();
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

    uploadImg() {
        this.usuarioService.uploadImg(this.img, this.usuario._id);
    }
}
