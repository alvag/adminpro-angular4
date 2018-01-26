import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UsuarioService } from "../usuario/usuario.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private usuarioService: UsuarioService,
        private router: Router
    ) {}
    canActivate() {
        if (this.usuarioService.isAuth()) {
            return true;
        } else {
            this.router.navigate(["/login"]);
            return false;
        }
    }
}
