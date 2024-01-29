import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingsService } from './core/services/settings.service';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'mrc-entretien';

    private settingsSub: Subscription;
    isModalOpen$: Observable<boolean>;

    constructor(private settingsService: SettingsService) {}
    ngOnInit(): void {
        this.initializeValues();
    }

    private initializeValues() {
        // test it

        this.settingsSub = this.settingsService.initLocalStorage().subscribe();

        this.isModalOpen$ = this.settingsService?.sideBarTogglingSubject.asObservable();
        this.isModalOpen$.subscribe((res) => {});
    }

    ngOnDestroy(): void {
        this.settingsSub.unsubscribe();
    }
}
