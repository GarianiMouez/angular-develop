import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../../core/services/notification.service';
import { FormControl } from '@angular/forms';
import { calculateDiff } from '../../../utlis/globalfunction';

@Component({
    selector: 'header-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit, OnChanges, OnDestroy {
    private notSub: Subscription;

    notifications: Notification[];

    @Input('initializeValues') initialValuesProps: any;
    image_url: any;

    fontStyleControl = new FormControl('');
    fontStyle?: string;

    constructor(
        private router: Router,
        private domSanitizer: DomSanitizer,
        private notificationService: NotificationService
    ) {}

    ngOnInit(): void {
        let image = this.setImageUrl(
            !!this.initialValuesProps?.email ? this.initialValuesProps?.email : 'Admin@Admin.com'
        );
        document.getElementById('profileImage').innerHTML = image;
    }
    private setImageUrl(userName: string) {
        if (userName) {
            const intials =
                userName.substring(0, userName.indexOf('@')).charAt(0).toUpperCase() +
                userName.substring(0, userName.indexOf('@')).charAt(1).toUpperCase();
            return intials;
        }
    }
    ngOnChanges(changes: SimpleChanges): void {}

    calculateDiff(date) {
        return calculateDiff(date);
    }

    onReadNotification() {
        if (this.initialValuesProps !== null) {
            this.notificationService.readNotification();
        }
    }

    logout() {
        this.router.navigate(['/login']);
    }

    ngOnDestroy(): void {}
}
