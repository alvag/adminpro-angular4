import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { ProgressComponent } from "./pages/progress/progress.component";
import { Graficas1Component } from "./pages/graficas1/graficas1.component";
import { NotFoundComponent } from "./shared/not-found/not-found.component";
import { PagesComponent } from "./pages/pages.component";
import { RegisterComponent } from "./login/register.component";

const appRoutes: Routes = [
    {
        path: "",
        component: PagesComponent,
        children: [
            { path: "", component: DashboardComponent },
            { path: "progress", component: ProgressComponent },
            { path: "graficas1", component: Graficas1Component },
            { path: "", redirectTo: "/", pathMatch: "full" },
        ]
    },
    { path: "registrar", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: "**", component: NotFoundComponent }
];


export const APP_ROUTES = RouterModule.forRoot(appRoutes);
