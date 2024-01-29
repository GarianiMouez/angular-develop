import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BackendMessage } from '../../../core/interfaces/backendMessage';
import {  NotificationAlertService } from '../../../core/services/notification-alert.service';

@Component({
    selector: 'app-success',
    templateUrl: './success.component.html',
    styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit {
    @Input('isFirstTime') isFirstTImeProps: boolean;
    @Input('backendSuccess') backendSuccessProps: BackendMessage;

    constructor(private notificationAlertService: NotificationAlertService, private translateService: TranslateService) {}

    successMessages: string[] | string;

    ngOnInit(): void {
        if (this.backendSuccessProps != null && typeof this.backendSuccessProps != 'string') {
            this.successMessages = Object.keys(this.backendSuccessProps).map((name: string) => {
                const message = this.backendSuccessProps[name];
                return `${message}`;
            });
            this.notificationAlertService.success(
                this.translateService.instant('APP.SUCCESS.SUBMIT.TEXT') + ' :  ' + this.successMessages[1]
            );
        }

        if (typeof this.backendSuccessProps == 'string') {
            this.successMessages = this.backendSuccessProps;
            this.notificationAlertService.success(
                this.translateService.instant('APP.SUCCESS.SUBMIT.TEXT') + ' :  ' + this.successMessages
            );
        }
    }
}
