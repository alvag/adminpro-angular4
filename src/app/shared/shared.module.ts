import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { HeaderComponent } from "./header/header.component";
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { PipesModule } from "../pipes/pipes.module";
import { ModalUploadComponent } from "../components/modal-upload/modal-upload.component";

@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NotFoundComponent,
        ModalUploadComponent
    ],
    imports: [RouterModule, CommonModule, PipesModule],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NotFoundComponent,
        ModalUploadComponent
    ]
})
export class SharedModule {}
