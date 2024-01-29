import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, Subscription } from 'rxjs';
import { MyModule } from './_nav';

@Component({
    selector: 'app-sidebar-component',
    templateUrl: './side-bar.component.html',
    styleUrls: ['side-bar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
    @ViewChild('sidenav') public sidenav: MatSidenav;
    @Output('onHideSideBar') onHideSideBarEvent = new EventEmitter<void>();

    appropriateClass: string = '';
    navItems = [];
    isLoggedIn$: Observable<boolean>;
    sidebarSub: Subscription;
    indexExpanded: number = -1;

    constructor() {}

    onHideSideBar() {
        this.onHideSideBarEvent.emit();
    }

    ngOnInit(): void {
        this.loadNavItems();
        this.intializeValues();
    }

    loadNavItems() {
        this.navItems = MyModule.getNavItems();
    }

    shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some((h) => h.test(window.location.host));
    opened: boolean;
    toggleMenu() {
        this.opened = !this.opened;
    }

    clickMenu() {}

    private intializeValues() {}

    togglePanels(index: number) {
        this.indexExpanded = index == this.indexExpanded ? -1 : index;
    }

    ngOnDestroy(): void {}
}
