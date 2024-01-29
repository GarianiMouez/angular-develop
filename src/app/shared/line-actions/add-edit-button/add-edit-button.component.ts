import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { SettingsService } from '../../../core/services/settings.service';

//edit  header #f4f4f4
//add header  #fbfff2

@Component({
    selector: 'line-add-edit',
    styleUrls: ['add-edit-button.component.scss'],

    template: `<button
            *ngIf="data.id"
            #edit
            mat-icon-button
            class=" "
            data-toggle="modal"
            ata-backdrop="static"
            data-keyboard="false"
            (click)="modalEditShow(data)"
        >
            <mat-icon class="text-warning">edit</mat-icon>
        </button>
        <button
            mat-fab
            *ngIf="!data.id"
            type="button"
            data-toggle="modal"
            class="float-end add-button"
            (click)="modalEditShow(data)"
            [matTooltip]="toolTip"
        >
            <mat-icon>add</mat-icon>
        </button>

        <div
            bsModal
            #editModal="bs-modal"
            class="modal fade blur-max border "
            modal
            tabindex="-1"
            role="dialog"
            aria-labelledby="editModalLabel"
            aria-hidden="true"
            [config]="{ backdrop: 'static', keyboard: false }"
            href="#"
        >
            <div
                style="z-index: 2;  position: relative;
                   top: 5%;"
                [ngClass]="modalSize"
                class="modal-dialog  "
                role="document"
            >
                <div class="modal-content ">
                    <div
                        class="modal-header text-center  "
                        [ngStyle]="{ 'background-color': data.id === undefined ? '#fbfff2' : '#f4f4f4' }"
                    >
                        <h3 class="col-md-11  modal-title text-center">
                            {{
                                data.id === undefined
                                    ? ('APP.BODY.' + headerName + '.POPUP.HEADER.CREATION_HEADER.TITLE'
                                      | translate)
                                    : ('APP.BODY.' + headerName + '.POPUP.HEADER.EDITION_HEADER.TITLE' | translate)
                            }}
                        </h3>
                        <div class="btn-grdoup">
                            <button mat-icon-button class="" aria-label="Close" (click)="modalEditHide()">
                                <mat-icon>cancel</mat-icon>
                            </button>
                        </div>
                    </div>

                    <div class="modal-body text-center   " *ngIf="this.editModal.isShown">
                        <ng-container *ngTemplateOutlet="formTemplate; context: { data: data }">
                            <button mat-icon-button class="" aria-label="Close" (click)="modalEditHide()">
                                <mat-icon>cancel</mat-icon>
                            </button>
                        </ng-container>
                        <!--
                        <button mat-icon-button class="" aria-label="Close" (click)="modalEditHide()">
                            <mat-icon>cancel</mat-icon>
                        </button> -->
                    </div>
                </div>
            </div>
        </div> `,
})
export class lineAddEditButton implements OnInit {
    @ViewChild('editModal', { read: ModalDirective }) public editModal?: ModalDirective;
    @Input('headerName') headerName: string;
    @Input('modalSize') modalSize: string;
    @Input('formTemplate') formTemplate: TemplateRef<any>;
    @Input('data') data: any;
    @Input('isLoading') isLoading$: Observable<boolean>;
    @Output('onHideSideBar') onHideSideBarEvent = new EventEmitter<boolean>();

    constructor(private settingsService: SettingsService, private r: ComponentFactoryResolver) {}
    ngOnInit(): void {}

    modalEditShow(data?) {
        this.settingsService.sideBarTogglingSubject.next(false);
        setTimeout(() => {
            this.editModal?.show();
        }, 325);
    }

    modalEditHide() {
        this.editModal?.hide();
        this.settingsService.sideBarTogglingSubject.next(true);
    }
}
