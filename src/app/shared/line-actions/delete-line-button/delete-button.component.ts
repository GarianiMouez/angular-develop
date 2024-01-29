import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SettingsService } from '../../../core/services/settings.service';

@Component({
    selector: 'line-delete',
    template: `
        <button #delete mat-icon-button class=" ml-2" placement="top" (click)="modalDeleteShow(data)">
            <mat-icon color="warn">delete</mat-icon>
        </button>
        <div
            bsModal
            #deleteModal="bs-modal"
            class="modal fade blur-min"
            modal
            tabindex="-1"
            role="dialog"
            aria-labelledby="deleteModalLabel"
            aria-hidden="true"
        >
            <div style="z-index: 10" class=" modal-dialog    " role="document">
                <div class="modal-content">
                    <div class="modal-header text-center">
                        <h3 class="col-md-11  modal-title text-center">
                            {{ 'APP.BODY.' + headerName + '.DELETION_POPUP.HEADER.TEXT' | translate }}
                        </h3>
                        <div class="btn-group">
                            <button #edit mat-icon-button class="" (click)="onHideModal()">
                                <mat-icon>cancel</mat-icon>
                            </button>
                        </div>
                    </div>
                    <br />
                    <div class="modal-body">
                        <h5>
                            {{ 'APP.BODY.' + headerName + '.DELETION_POPUP.BODY.TEXT' | translate }}
                        </h5>
                    </div>
                    <mat-divider class="mt-1 mb-3"></mat-divider>
                    <mat-card-footer class="">
                        <mat-card-actions>
                            <button mat-raised-button (click)="onHideModal()">
                                <mat-icon class="cancel">cancel</mat-icon>
                                {{
                                    'APP.BODY.' + headerName + '.DELETION_POPUP.FOOTER.BUTTONS.CANCEL' | translate
                                }}
                            </button>

                            <button mat-raised-button formPage (click)="onDelete(data)">
                                <mat-icon class="success">check</mat-icon>
                                {{
                                    'APP.BODY.' + headerName + '.DELETION_POPUP.FOOTER.BUTTONS.VALIDATE'
                                        | translate
                                }}
                            </button>
                        </mat-card-actions>
                    </mat-card-footer>
                    <br />
                </div>
            </div>
        </div>
    `,
})
export class lineDeleteButton {
    @Input('headerName') headerName: string;
    @ViewChild('deleteModal') public deleteModal?: ModalDirective;
    @Input('data') data: any;
    @Output('onSendData') onDeleteData = new EventEmitter<any>();

    constructor(private settingsService: SettingsService) {}

    modalDeleteShow(data: any) {
        this.settingsService.sideBarTogglingSubject.next(false);

        setTimeout(() => {
            this.deleteModal.show();
        }, 325);
    }

    onDelete(data) {
        this.onDeleteData.emit(data);
        this.onHideModal();
    }

    onHideModal() {
        this.deleteModal.hide();
        this.settingsService.sideBarTogglingSubject.next(true);
    }
}
