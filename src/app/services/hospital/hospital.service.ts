import { Hospital } from "./../../models/hospital.model";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable()
export class HospitalService {
    token: string = "";
    constructor(private http: HttpClient) {
        this.token = localStorage.getItem("token");
    }

    cargarHospitales(url: string) {
        return this.http.get(url);
    }

    obtenerHospital(id: string) {
        let url = environment.API_URL + "hospital/" + id;
        return this.http.get(url);
    }

    borrarHospital(id: string) {
        let url = environment.API_URL + "hospital/" + id;

        let headers = new HttpHeaders({
            Authorization: "Bearer " + this.token,
            "Content-Type": "application/json"
        });

        return this.http
            .delete(url, { headers: headers })
            .map((response: any) => {
                swal(
                    "Hospital Eliminado",
                    "El hosital ha sido eliminado de la base de datos.",
                    "success"
                );
                return true;
            });
    }

    registrarHospital(hospital: Hospital) {
        let url = environment.API_URL + "hospital";

        let headers = new HttpHeaders({
            Authorization: "Bearer " + this.token,
            "Content-Type": "application/json"
        });

        return this.http
            .post(url, hospital, { headers: headers })
            .map((response: any) => {
                swal("Hospital registrado", hospital.nombre, "success");
                return response.hospital;
            });
    }

    actualizarHospital(hospital: Hospital) {
        let url = environment.API_URL + "hospital/" + hospital._id;

        let headers = new HttpHeaders({
            Authorization: "Bearer " + this.token,
            "Content-Type": "application/json"
        });

        return this.http
            .put(url, hospital, { headers: headers })
            .map((response: any) => {
                swal(
                    "Hospital Actualizado",
                    "Datos actualizados correctamente.",
                    "success"
                );
                return true;
            });
    }
}
