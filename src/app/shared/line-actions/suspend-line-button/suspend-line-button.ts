import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'line-suspend',
    template: `
        <button mat-icon-button (click)="modalSuspendShow(data)">
            <mat-icon class="text-suspended">remove_circle_outline</mat-icon>
        </button>
        <div
            bsModal
            #suspendModal="bs-modal"
            class="modal fade blur-min"
            modal
            tabindex="-1"
            role="dialog"
            aria-labelledby="SuspendModalLabel"
            aria-hidden="true"
        >
            <div style="z-index: 10" class=" modal-dialog    " role="document">
                <div class="modal-content">
                    <div class="modal-header text-center">
                        <h3 class="col-md-11  modal-title text-center">{{ 'Suspender' }}</h3>
                        <div class="btn-group">
                            <button #edit mat-icon-button class="" (click)="onHideModal()">
                                <mat-icon>cancel</mat-icon>
                            </button>
                        </div>
                    </div>
                    <div class="modal-body">
                        <h5>
                            {{ 'Etes-vous sûr que vous voulez suspender ?' }}
                        </h5>
                    </div>
                    <div class="modal-footer">
                        <button mat-raised-button (click)="onHideModal()">
                            <mat-icon class="cancel">cancel</mat-icon>
                            {{ 'APP.BODY.' + headerName + '.DELETION_POPUP.FOOTER.BUTTONS.CANCEL' | translate }}
                        </button>
                        &nbsp;
                        <button mat-raised-button pull-right formPage (click)="onSuspend(data)">
                            <mat-icon class="success">check</mat-icon>
                            {{ 'APP.BODY.' + headerName + '.DELETION_POPUP.FOOTER.BUTTONS.VALIDATE' | translate }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,

    styles: [],
})
export class lineSuspendButton implements OnInit {
    @ViewChild('suspendModal') public suspendModal?: ModalDirective;

    @Input('data') data: any;
    @Input('headerName') headerName: string;

    @Output('onSuspend') onSuspendEvent = new EventEmitter<any>();

    constructor() {}

    ngOnInit(): void {}

    modalSuspendShow(data: any) {
        this.suspendModal.show();
    }

    onSuspend(data) {
        this.onSuspendEvent.emit(data);
        this.onHideModal();
    }

    onHideModal() {
        this.suspendModal.hide();
    }
}
