import { Component, OnInit } from "@angular/core";

declare function init_plugins();

@Component({
    selector: "app-not-found",
    templateUrl: "./not-found.component.html",
    styleUrls: ["./not-found.component.css"]
})
export class NotFoundComponent implements OnInit {
    year: number = new Date().getFullYear();

    constructor() {}

    ngOnInit() {
        init_plugins();
    }
}
