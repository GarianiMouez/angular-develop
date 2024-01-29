import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SettingsService {
    public sideBarTogglingSubject = new BehaviorSubject(false);

    configSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private translateService: TranslateService) {}

    initLocalStorage() {
        return this.setTranslateServiceLanguage();
    }

    setTranslateServiceLanguage() {
        return this.translateService.use('fr');
    }
}
