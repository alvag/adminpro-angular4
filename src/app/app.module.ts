import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { APP_ROUTES } from "./app.routes";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./login/register.component";
import { PagesModule } from "./pages/pages.module";
import { SettingsService } from './services/settings.service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        APP_ROUTES,
        PagesModule
    ],
    providers: [SettingsService],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
