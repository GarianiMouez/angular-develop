import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Language } from '../../../core/interfaces/ILanguage';

@Component({
  selector: 'header-translate',
  template: `
    <span class=" mr-3 " *ngIf="selectLanguageProps$ | async as selectLanguage">
      <button mat-icon-button [matMenuTriggerFor]="menu">
        <span>
          {{ selectLanguage.toUpperCase() }}
        </span>
        <mat-icon>keyboard_arrow_down</mat-icon>
      </button>

      <mat-menu #menu="matMenu" yPosition="below" class="mt-2 ">
        <div *ngFor="let language of languages">
          <button
            *ngIf="language !== selectLanguage"
            style="cursor: pointer"
            mat-menu-item
            (click)="onChangeLanguage(language)"
          >
            <img
              class="mr-2"
              src="assets/img/brand/{{ language }}.png"
              alt="admin@bootstrapmaster.com"
            />
            <span>
              {{ language === 'fr' ? 'Français' : 'English' }}
            </span>
          </button>
        </div>
      </mat-menu>
    </span>
  `,
  styleUrls: ['./translate.component.scss'],
})
export class translateComponent {
  @Output('onChangeLanguage') onChangeLanguageEvent =
    new EventEmitter<Language>();
  @Input('selectLanguage') selectLanguageProps$: Observable<string> = of('fr');
  languages = ['en', 'fr'];

  onChangeLanguage(data: Language) {
    this.onChangeLanguageEvent.emit(data);
  }
}
