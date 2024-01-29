import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationAlertService } from '../../core/services/notification-alert.service';
import { ErrorComponent } from './components/error.component';

@NgModule({
    declarations: [ErrorComponent],
    imports: [TranslateModule, CommonModule, MatSnackBarModule],
    exports: [ErrorComponent, MatSnackBarModule],
    providers: [NotificationAlertService],
})
export class ErrorModule {}
