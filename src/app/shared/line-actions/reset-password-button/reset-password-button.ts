import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'line-reset-password',
    template: ` <button #delete mat-icon-button class=" ml-2" placement="top" (click)="resetPassword()">
        <!--<mat-icon style="color:#872b2b"> settings_backup_restore</mat-icon>-->
        <mat-icon>password</mat-icon>

        <!--         <span class="fa-passwd-reset fa-stack mt-1">
            <i style="color:#872b2b" class="fa fa-undo fa-stack-2x"></i>
            <mat-icon color="warn">password</mat-icon>
        </span> -->
    </button>`,
    styleUrls: ['./reset-password-button.scss'],
})
export class ResetPasswordButtonComponent {
    @Input('data') data: any;
    constructor(private authService: AuthService) {}

    resetPassword() {
 
    }
}
