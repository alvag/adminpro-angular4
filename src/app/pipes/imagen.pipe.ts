import { environment } from "./../../environments/environment";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "imagen"
})
export class ImagenPipe implements PipeTransform {
    transform(img: string, tipo: string = "usuarios"): any {
        let url = environment.API_URL + "img/";

        if (!img) {
            return url + "usuarios/x";
        }

        if (img.indexOf("https") >= 0) {
            return img;
        }

        return url + tipo + "/" + img;
    }
}
