import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'line-login-as',
    template: ` <button #login_as mat-icon-button class=" ml-2" placement="top" (click)="onLogin()">
        <mat-icon style="color:#004e75"> visibility</mat-icon>
    </button>`,
    styleUrls: ['./login-as-button.component.scss'],
})
export class LoginAsButtonComponent {
    constructor(private authService: AuthService) {}
    @Input('data') data: any;

    onLogin() {}
}
