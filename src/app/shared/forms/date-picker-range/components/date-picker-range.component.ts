import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { formatCustomDate } from '../../../../utlis/globalfunction';

@Component({
    selector: 'range-date-selector',
    templateUrl: './date-picker-range.component.html',
    styleUrls: ['./date-picker-range.component.scss'],
})
export class DatePickerRangeComponent implements OnInit {
    @Output('onSendData') sendData = new EventEmitter<any>();
    form: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.initilizeValues();
    }

    sendDateRange(event) {
        this.sendData.emit(event);
    }

    private initilizeValues() {
        const now = new Date();

        this.form = this.fb.group({
            start_date: new FormControl({
                value: new Date(now.getFullYear(), now.getMonth() - 1, 1),
                disabled: false,
            }),
            end_date: new FormControl({
                value: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
                disabled: false,
            }),
        });
    }

    onSendData() {
        if (!!this.form.get('end_date').value) {
            this.sendData.emit({
                start_date: formatCustomDate(this.form.value.start_date),
                end_date: formatCustomDate(this.form.value.end_date),
            });
        }
    }
}
