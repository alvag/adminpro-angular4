import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
// import { PagesComponent } from "./pages.component";
import { IncrementadorComponent } from "../components/incrementador/incrementador.component";
import { SharedModule } from "../shared/shared.module";
import { PAGES_ROUTES } from "./pages.routes";
import { ChartsModule } from "ng2-charts";
import { GraficaDonaComponent } from "../components/grafica-dona/grafica-dona.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { PipesModule } from "../pipes/pipes.module";
import { ProfileComponent } from "./profile/profile.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
// import { ModalUploadComponent } from "./../components/modal-upload/modal-upload.component";
import { HospitalesComponent } from "./hospitales/hospitales.component";
import { MedicosComponent } from "./medicos/medicos.component";
import { MedicoComponent } from "./medicos/medico.component";
import { BusquedaComponent } from "./busqueda/busqueda.component";

@NgModule({
    declarations: [
        // PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficaDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        // ModalUploadComponent,
        HospitalesComponent,
        MedicosComponent,
        MedicoComponent,
        BusquedaComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        PAGES_ROUTES,
        SharedModule,
        ChartsModule,
        PipesModule
    ],
    exports: []
})
export class PagesModule {}
