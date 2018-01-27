import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import {
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    AuthGuard,
    UploadService,
    ModalUploadService
} from "./service.index";

@NgModule({
    imports: [CommonModule, HttpClientModule],
    declarations: [],
    providers: [
        SettingsService,
        SidebarService,
        SharedService,
        UsuarioService,
        AuthGuard,
        UploadService,
        ModalUploadService
    ]
})
export class ServiceModule {}
