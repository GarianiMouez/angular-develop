import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalenderComponent } from './component/calender.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeEs from '@angular/common/locales/es';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MaterialModule } from '../../material.module';

registerLocaleData(localeFr);
registerLocaleData(localeEs);

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
    ],
    declarations: [CalenderComponent],
    exports: [CalenderComponent],
})
export class calenderModule {}
