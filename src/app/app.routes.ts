import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { NotFoundComponent } from "./shared/not-found/not-found.component";
import { RegisterComponent } from "./login/register.component";
import { PagesComponent } from "./pages/pages.component";
import { AuthGuard } from "./services/service.index";

const appRoutes: Routes = [
    { path: "registrar", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    {
        path: "",
        component: PagesComponent,
        canActivate: [AuthGuard],
        loadChildren: "./pages/pages.module#PagesModule"
    },
    { path: "**", component: NotFoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes);
