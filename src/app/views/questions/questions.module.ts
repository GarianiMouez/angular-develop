import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material.module';
import { lineActionsModule } from 'src/app/shared/line-actions/line-actions.module';
import { QuestionFormComponent } from './questions-form/question-form.component';
import { QuestionComponent } from './questions-list/questions.component';
import { QuestionRoutingModule } from './questions-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        QuestionRoutingModule,
        lineActionsModule,
        MaterialModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [QuestionComponent, QuestionFormComponent],
    exports: [QuestionComponent],
})
export class QuestionModule {}
