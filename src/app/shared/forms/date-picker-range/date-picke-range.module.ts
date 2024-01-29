import { NgModule } from '@angular/core';
import { DatePickerRangeComponent } from './components/date-picker-range.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [DatePickerRangeComponent],
    imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, TranslateModule],
    exports: [DatePickerRangeComponent],
})
export class DatePickerRangeModule {}
