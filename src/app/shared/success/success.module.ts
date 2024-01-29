import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {  NotificationAlertService } from '../../core/services/notification-alert.service';
import { MaterialModule } from '../../material.module';
import { SuccessComponent } from './components/success.component';

@NgModule({
    declarations: [SuccessComponent],
    imports: [TranslateModule, CommonModule, MaterialModule],
    exports: [SuccessComponent],
    providers: [NotificationAlertService],
})
export class SuccessModule {}
