import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SectionComponent } from './sections-list/sections.component';
import { SectionRoutingModule } from './sections-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material.module';
import { lineActionsModule } from 'src/app/shared/line-actions/line-actions.module';
import { SectionFomrComponent } from './sections-form/section-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    imports: [
        CommonModule,
        SectionRoutingModule,
        lineActionsModule,
        MaterialModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        DragDropModule,
    ],
    declarations: [SectionComponent, SectionFomrComponent],
    exports: [SectionComponent],
})
export class SectionModule {}
