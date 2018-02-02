import { BusquedaComponent } from "./busqueda/busqueda.component";
import { MedicoComponent } from "./medicos/medico.component";
import { MedicosComponent } from "./medicos/medicos.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { RouterModule, Routes } from "@angular/router";
import { ProgressComponent } from "./progress/progress.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { PagesComponent } from "./pages.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { AuthGuard, AdminGuard } from "../services/service.index";
import { ProfileComponent } from "./profile/profile.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { HospitalesComponent } from "./hospitales/hospitales.component";
import { RefreshTokenGuard } from "../services/service.index";

const pagesRoutes: Routes = [
    {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [RefreshTokenGuard],
        data: { titulo: "Dashboard" }
    },
    {
        path: "progress",
        component: ProgressComponent,
        data: { titulo: "Progress Bar" }
    },
    {
        path: "graficas1",
        component: Graficas1Component,
        data: { titulo: "Gráficas" }
    },
    {
        path: "account-settings",
        component: AccountSettingsComponent,
        data: { titulo: "Ajustes" }
    },
    {
        path: "promesas",
        component: PromesasComponent,
        data: { titulo: "Promesas" }
    },
    {
        path: "rxjs",
        component: RxjsComponent,
        data: { titulo: "RXJS" }
    },
    {
        path: "perfil",
        component: ProfileComponent,
        data: { titulo: "Perfil de Usuario" }
    },
    {
        path: "busqueda/:q",
        component: BusquedaComponent,
        data: { titulo: "Buscador" }
    },
    // Mantenimintos
    {
        path: "usuarios",
        component: UsuariosComponent,
        // canActivate: [AdminGuard],
        data: { titulo: "Mantenimiento de Usuarios" }
    },
    {
        path: "hospitales",
        component: HospitalesComponent,
        data: { titulo: "Mantenimiento de Hospitales" }
    },
    {
        path: "medicos",
        component: MedicosComponent,
        data: { titulo: "Mantenimiento de Médicos" }
    },
    {
        path: "medico/:id",
        component: MedicoComponent,
        data: { titulo: "Actualizar Médico" }
    },
    { path: "", redirectTo: "/dashboard", pathMatch: "full" }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
