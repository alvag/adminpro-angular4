import { UsuarioService } from "./../usuario/usuario.service";
import { Injectable } from "@angular/core";
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private usuarioService: UsuarioService) {}
    canActivate() {
        if (this.usuarioService.usuario.role === "ADMIN_ROLE") {
            return true;
        } else {
            this.usuarioService.logOut();
            return false;
        }
    }
}
