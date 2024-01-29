import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { SettingsService } from '../../../core/services/settings.service';

@Component({
    selector: 'line-history',
    template: `
        <button
            mat-icon-button
            data-toggle="modal"
            ata-backdrop="static"
            data-keyboard="false"
            class="ml-2"
            (click)="modalHistoryShow()"
        >
            <mat-icon class="  ">history</mat-icon>
        </button>

        <div
            bsModal
            #historyModal="bs-modal"
            class="modal right fade blur-min "
            id="myModal2"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myModalLabel2"
            [config]="{ backdrop: 'static', keyboard: false }"
        >
            <div #scrollMe [scrollTop]="scrollMe.scrollHeight" class="modal-dialog  " role="document">
                <div class="modal-content ">
                    <div class="modal-header text-center  ">
                        <div class="" *ngIf="data?.data?.length > 0">
                            <button mat-icon-button class="" aria-label="delete">
                                <mat-icon class="text-danger">delete</mat-icon>
                            </button>
                        </div>
                        <h3 class="col-md-10  modal-title text-center">
                            {{ 'APP.BODY.' + headerName + '.POPUP.HEADER.HISTORY_HEADER.TITLE' | translate }}
                        </h3>
                        <div class="">
                            <button mat-icon-button class="" aria-label="Close" (click)="modalHistoryHide()">
                                <mat-icon>cancel</mat-icon>
                            </button>
                        </div>
                    </div>
                    <div class="modal-body " *ngIf="data">
                        <h6>
                            {{ data | json }}
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./history-line.button.scss'],
})
export class HistoryLineComponent implements OnInit {
    @ViewChild('historyModal', { read: ModalDirective }) public historyModal?: ModalDirective;
    @Input('headerName') headerName: string;
    @Input('data') data: any;
    @Output('onGetHistory') onGetHistoryEvent = new EventEmitter<any>();

    form: FormGroup;

    constructor(private settingsService: SettingsService, private fb: FormBuilder) {}
    ngOnInit(): void {}

    onEmitActions = new EventEmitter<{ action: string; action_data: any }>();

    modalHistoryShow() {
        this.settingsService.sideBarTogglingSubject.next(false);

        setTimeout(() => {
            this.historyModal?.show();
        }, 325);
    }

    modalHistoryHide() {
        this.historyModal?.hide();
        this.settingsService.sideBarTogglingSubject.next(true);
    }
}
