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
import { MatMenuTrigger } from '@angular/material/menu';
/* import { SettingsService } from 'src/app/core/services/settings.service';
 */
@Component({
    selector: 'line-affectation',
    styleUrls: ['affectation-button.component.scss'],

    template: `
        <button #clickHoverMenuTrigger="matMenuTrigger" [matMenuTriggerFor]="beforeMenu" mat-icon-button>
            <mat-icon class="text-danger">cancel</mat-icon>
        </button>

        <mat-menu
            (menuOpened)="isOpened($event)"
            class="affectation-menu"
            #beforeMenu="matMenu"
            xPosition="before"
        >
            <div
                class="
        "
                *ngIf="this.clickHoverMenuTrigger?.menuOpen === true"
            >
                <ng-container *ngTemplateOutlet="formTemplate; context: { data: data }"> </ng-container>
            </div>
        </mat-menu>

        <!--    <mat-menu class="affectation-menu" #beforeMenu="matMenu" xPosition="before">
            <ng-container *ngTemplateOutlet="formTemplate; context: { data: data }"> </ng-container>
        </mat-menu> -->

        <!--     <mat-menu class="affectation-menu" #beforeMenu="matMenu" xPosition="before">
            <ng-container *ngTemplateOutlet="formTemplate; context: { data: data }"> </ng-container>
        </mat-menu> -->

        <div
            bsModal
            #affModal="bs-modal"
            class="modal fade blur-max border "
            modal
            tabindex="-1"
            role="dialog"
            aria-labelledby="affModalLabel"
            aria-hidden="true"
            [config]="{ backdrop: 'static', keyboard: false }"
            href="#"
        >
            <div style="z-index: 2" [ngClass]="modalSize" class="modal-dialog modal-lg " role="document">
                <div class="modal-content ">
                    <div class="modal-header text-center  ">
                        <h3 class="col-md-11  modal-title text-center">
                            {{ 'APP.BODY.' + headerName + '.POPUP.HEADER.AFFECTATION_HEADER.TITLE' | translate }}
                        </h3>
                        <div class="btn-group">
                            <button mat-icon-button class="" aria-label="Close" (click)="modalEditHide()">
                                <mat-icon>cancel</mat-icon>
                            </button>
                        </div>
                    </div>

                    <div class="modal-body  " *ngIf="this.affModal.isShown">
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
        </div>
    `,
})
export class lineAffectationButton implements OnInit {
    @ViewChild('clickHoverMenuTrigger') clickHoverMenuTrigger: MatMenuTrigger;

    @ViewChild('affModal', { read: ModalDirective }) public affModal?: ModalDirective;
    @Input('headerName') headerName: string;
    @Input('modalSize') modalSize: string;
    @Input('formTemplate') formTemplate: TemplateRef<any>;
    @Input('data') data: any;
    @Input('isLoading') isLoading$: Observable<boolean>;
    @Output('onHideSideBar') onHideSideBarEvent = new EventEmitter<boolean>();

    constructor(private r: ComponentFactoryResolver, private settingsService: SettingsService) {}
    ngOnInit(): void {}

    isOpened(evt: any) {
        console.log(evt);
    }

    openOnMouseOver() {
        console.log(this.clickHoverMenuTrigger.menuOpen);

        this.clickHoverMenuTrigger.openMenu();
    }

    modalEditShow(data?) {
        this.settingsService.sideBarTogglingSubject.next(false);

        setTimeout(() => {
            this.affModal?.show();
        }, 325);
    }

    modalEditHide() {
        if (this.headerName === 'CHAUFFEUR-CAMION') {
            this.affModal?.hide();
        } else {
            this.clickHoverMenuTrigger.closeMenu();
        }
        this.settingsService.sideBarTogglingSubject.next(true);
    }
}
