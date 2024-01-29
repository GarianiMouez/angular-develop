import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../../material.module';
import { NgxBootstrapModule } from '../../ngx-bootstrap.module';
import { lineAddEditButton } from './add-edit-button/add-edit-button.component';
import { lineAffectationButton } from './affectation-line-button/affectation-button.component';
import { lineDeleteButton } from './delete-line-button/delete-button.component';
import { HistoryLineComponent } from './history-line-button/history-line.button';
import { lineSuspendButton } from './suspend-line-button/suspend-line-button';

@NgModule({
    declarations: [
        lineAddEditButton,
        lineDeleteButton,
        lineAffectationButton,

        lineSuspendButton,
        HistoryLineComponent,
    ],
    imports: [
        MaterialModule,
        NgxBootstrapModule,
        RouterModule,
        TranslateModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [lineAddEditButton, lineDeleteButton, lineAffectationButton, lineSuspendButton, HistoryLineComponent],
})
export class lineActionsModule {}
