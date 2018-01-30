import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Medico } from "../../models/medico.model";

@Injectable()
export class MedicoService {
    token: string = "";
    constructor(private http: HttpClient) {
        this.token = localStorage.getItem("token");
    }

    cargarMedicos(url: string) {
        return this.http.get(url);
    }

    borrarMedico(id: string) {
        let url = environment.API_URL + "medico/" + id;

        let headers = new HttpHeaders({
            Authorization: "Bearer " + this.token,
            "Content-Type": "application/json"
        });

        return this.http
            .delete(url, { headers: headers })
            .map((response: any) => {
                swal(
                    "Médico Eliminado",
                    "El médico ha sido eliminado de la base de datos.",
                    "success"
                );
                return true;
            });
    }

    guardarMedico(medico: Medico) {
        let url = environment.API_URL + "medico";

        let headers = new HttpHeaders({
            Authorization: "Bearer " + this.token,
            "Content-Type": "application/json"
        });

        if (medico._id === "") {
            return this.http
                .post(url, medico, { headers: headers })
                .map((response: any) => {
                    swal("Medico registrado", medico.nombre, "success");
                    return response.medico;
                });
        } else {
            url += "/" + medico._id;
            return this.http
                .put(url, medico, { headers: headers })
                .map((response: any) => {
                    swal("Medico Actualizado", medico.nombre, "success");
                    return response.medico;
                });
        }
    }
}
