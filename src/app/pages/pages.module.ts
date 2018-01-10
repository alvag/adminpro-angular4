import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

// Componentes
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { PagesComponent } from "./pages.component";
import { IncrementadorComponent } from "../components/incrementador/incrementador.component";

// Módulos
import { SharedModule } from "../shared/shared.module";
import { PAGES_ROUTES } from "./pages.routes";

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        PAGES_ROUTES,
        SharedModule
    ],
    exports: []
})
export class PagesModule {
}
