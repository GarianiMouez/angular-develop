import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-select-filter',
    templateUrl: './select-filter.component.html',
    styleUrls: ['./select-filter.component.scss'],
})
export class SelectFilterComponent implements OnInit {
    @Input('data') data = [];

    @Input('type') type: string | Object;
    @Input('showedValue') showedValue: [];

    @Input('placeholder') placeholder = '';
    @Output('onSendData') onSendDataEvent = new EventEmitter<any>();

    form: FormGroup;

    public filteredData;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
      console.log('im working ');

        this.initilizeValues();
    }

    onSendData(data) {
        this.onSendDataEvent.emit(data);
    }

    isEmptyObject(item: any): boolean {
        return typeof item === 'object' ? true : false;
    }

    private initilizeValues() {
        this.filteredData = this.data.slice();
        this.form = this.fb.group({
            etat: new FormControl({ value: '', disabled: false }),
        });
    }
}
