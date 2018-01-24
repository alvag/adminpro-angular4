import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import swal from "sweetalert";

declare function init_plugins();

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./login.component.css"]
})
export class RegisterComponent implements OnInit {
    form: FormGroup;

    constructor() {}

    ngOnInit() {
        init_plugins();

        this.form = new FormGroup(
            {
                nombre: new FormControl("", Validators.required),
                email: new FormControl("", [
                    Validators.required,
                    Validators.email
                ]),
                password: new FormControl("", Validators.required),
                confirm_password: new FormControl("", Validators.required),
                checkCondiciones: new FormControl(false)
            },
            { validators: this.sonIguales("password", "confirm_password") }
        );
    }

    sonIguales(valor1: string, valor2: string) {
        return (group: FormGroup) => {
            let val1 = group.controls[valor1].value;
            let val2 = group.controls[valor2].value;

            if (val1 === val2) {
                return null;
            }

            return {
                sonIguales: true
            };
        };
    }

    registrarUsuario() {
        if (this.form.invalid) {
            return;
        }

        if (!this.form.value.checkCondiciones) {
            swal(
                "Importante",
                "Debe aceptar los términos y condiciones",
                "warning"
            );
            return;
        }

        console.log(this.form);
    }
}
