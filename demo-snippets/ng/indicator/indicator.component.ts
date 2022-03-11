import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';

@Component({
    selector: 'ns-indicator',
    templateUrl: './indicator.component.html',
    styleUrls: ["./indicator.component.scss"],
})
export class IndicatorComponent implements OnInit {
    selectedIndex = 0;

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
    resetPager() {
        this.selectedIndex = 0;
    }
    onIndexChanged(event: any): void {
        this.selectedIndex = event.value;
    }
}
