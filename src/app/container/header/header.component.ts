import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, of, tap } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { SettingsService } from 'src/app/core/services/settings.service';

@Component({
    selector: 'app-header-component',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class headerComponent implements OnInit, OnDestroy {
    @Input('sidenav') sidenav: MatSidenav;

    user_data$: Observable<any>;
    isLoggedIn$: Observable<boolean>;
    headerSub: Subscription;

    constructor(private settingsService: SettingsService) {}

    ngOnInit(): void {}

    toggleSideNav() {
        this.sidenav.toggle();
        this.settingsService?.sideBarTogglingSubject.next(this.sidenav.opened);
    }

    ngOnDestroy(): void {
        this.headerSub.unsubscribe();
    }
}
