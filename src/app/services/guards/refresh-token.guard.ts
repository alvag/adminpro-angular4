import { Injectable } from "@angular/core";
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from "@angular/router";
import { UsuarioService } from "../usuario/usuario.service";
import { reject } from "q";

@Injectable()
export class RefreshTokenGuard implements CanActivate {
    constructor(public usuarioService: UsuarioService) {}

    canActivate(): Promise<boolean> | boolean {
        let token = this.usuarioService.token;
        let payload = JSON.parse(atob(token.split(".")[1]));

        if (this.isExpired(payload.exp)) {
            this.usuarioService.logOut();
            return false;
        }

        return this.checkRefresh(payload.exp);
    }

    checkRefresh(dateExp: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let tokenExp = new Date(dateExp * 1000);
            let now = new Date();

            now.setTime(now.getTime() + 3600000);

            if (tokenExp.getTime() > now.getTime()) {
                resolve(true);
            } else {
                this.usuarioService.refreshToken().subscribe(
                    () => {
                        resolve(true);
                    },
                    () => {
                        reject(false);
                        this.usuarioService.logOut();
                    }
                );
            }
        });
    }

    isExpired(dateExp: number): boolean {
        let now = new Date().getTime() / 1000;

        return dateExp < now;
    }
}
