import { Component, OnInit } from "@angular/core";

declare function init_plugins();

@Component({
    selector: "app-not-found",
    templateUrl: "./not-found.component.html",
    styles: []
})
export class NotFoundComponent implements OnInit {
    constructor() {}

    ngOnInit() {
        init_plugins();
    }
}
