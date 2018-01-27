import { environment } from "./../../../environments/environment";
import { Injectable } from "@angular/core";

@Injectable()
export class UploadService {
    constructor() {}

    upload(file: File, type: string, id: string) {
        return new Promise((resolve, reject) => {
            let formData = new FormData();
            let xhr = new XMLHttpRequest();

            formData.append("imagen", file, file.name);

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log("imagen subida");
                        resolve(JSON.parse(xhr.response));
                    } else {
                        console.log("Error al subir imagen");
                        reject(JSON.parse(xhr.response));
                    }
                }
            };

            let url = environment.API_URL + "upload/" + type + "/" + id;

            xhr.open("PUT", url, true);
            xhr.setRequestHeader(
                "Authorization",
                "Bearer " + localStorage.getItem("token")
            );
            xhr.send(formData);
        });
    }
}
