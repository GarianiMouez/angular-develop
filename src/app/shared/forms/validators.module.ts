import { NgModule } from '@angular/core';
import { OnlyNumber } from './only-number.directive';
import { FormFieldCustomControlExample, MyTimeInput } from './time-input/form-field-custom-control-example';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [OnlyNumber, FormFieldCustomControlExample, MyTimeInput],
    imports: [MaterialModule, FormsModule, HttpClientModule, ReactiveFormsModule],
    exports: [OnlyNumber, FormFieldCustomControlExample, MyTimeInput],
})
export class ValidatorModule {}
