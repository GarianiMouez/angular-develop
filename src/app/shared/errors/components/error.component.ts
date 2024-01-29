import { Component, Input, OnInit } from '@angular/core';
import { BackendMessage } from '../../../core/interfaces/backendMessage';
import { NotificationAlertService } from '../../../core/services/notification-alert.service';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
    @Input('backendErrors') backendErrorProps: BackendMessage | string;

    constructor(private notificationAlertService: NotificationAlertService) {}
    errorMessages: string[] | string;

    ngOnInit(): void {
        if (this.backendErrorProps != null && typeof this.backendErrorProps != 'string') {
            this.errorMessages = Object.keys(this.backendErrorProps).map((name: string) => {
                const message = this.backendErrorProps[name];
                return `${message}`;
            });

            this.notificationAlertService.error(this.errorMessages[0] + ' : ' + this.errorMessages[1]);
        }

        if (typeof this.backendErrorProps == 'string') {
            this.errorMessages = this.backendErrorProps;
            this.notificationAlertService.error(this.errorMessages);
        }
    }
}
