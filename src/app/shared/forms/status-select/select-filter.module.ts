import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectFilterModule } from 'mat-select-filter';
import { MaterialModule } from '../../../material.module';
import { SelectFilterComponent } from './components/select-filter.component';

@NgModule({
    declarations: [SelectFilterComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, MatSelectFilterModule],
    exports: [SelectFilterComponent],
})
export class SelectFilterModule {}
