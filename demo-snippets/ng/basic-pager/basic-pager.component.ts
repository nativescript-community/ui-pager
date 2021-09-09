import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';

@Component({
    selector: 'ns-basic-pager',
    templateUrl: './basic-pager.component.html',
    styleUrls: ["./basic-pager.component.scss"],
})
export class BasicPagerComponent implements OnInit {
    constructor(private router: RouterExtensions) {}

    items = [
        {
            title: "First",
            color: "#e67e22"
        },
        {
            title: "Second",
            color: "#3498db"
        },
        {
            title: "Third",
            color: "#e74c3c"
        },
        {
            title: "Fourth",
            color: "#9b59b6"
        }
    ];

    ngOnInit(): void {}

    goBack(): void {
        this.router.back();
    }
}
