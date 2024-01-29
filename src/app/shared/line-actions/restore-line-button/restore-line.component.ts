import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/users.service';

@Component({
    selector: 'line-restore-user',
    template: ` <button
        #restore
        mat-icon-button
        class=" ml-2 text-primary "
        placement="top"
        (click)="restoreUser()"
    >
        <mat-icon>restore_from_trash</mat-icon>
    </button>`,
    styleUrls: ['./restore-line.component.scss'],
})
export class RestoreButtonComponent {
    @Input('data') data: any;
    @Output('restoreSubmited') restoreEvent = new EventEmitter<any>();

    constructor(private userService: UserService) {}

    restoreUser() {
        this.restoreEvent.emit(this.data);
    }
}
