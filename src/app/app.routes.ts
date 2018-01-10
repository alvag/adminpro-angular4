import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { NotFoundComponent } from "./shared/not-found/not-found.component";
import { RegisterComponent } from "./login/register.component";

const appRoutes: Routes = [
    { path: "registrar", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: "**", component: NotFoundComponent }
];


export const APP_ROUTES = RouterModule.forRoot(appRoutes);
