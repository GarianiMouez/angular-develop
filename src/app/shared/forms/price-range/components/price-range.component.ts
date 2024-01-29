import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Options, LabelType } from 'ngx-slider-v2';
import { combineLatest, exhaustMap, of, take } from 'rxjs';
@Component({
    selector: 'app-price-range',
    templateUrl: './price-range.component.html',
    styleUrls: ['./price-range.component.scss'],
})
export class PriceRangeComponent implements OnInit {
    @Input('floor') floor: number;
    @Input('ceil') ceil: number;
    @Input('minValue') minValue: number;
    @Input('maxValue') maxValue: number;

    @Output('onSendData') sendData = new EventEmitter<{ minValue: number; maxValue: number }>();
    value: number = 100;
    options: Options;

    constructor() {}
    ngOnInit(): void {
        this.options = {
            floor: this.floor,
            ceil: this.ceil,

            translate: (value: number, label: LabelType): string => {
                switch (label) {
                    case LabelType.Low:
                        return '<b>Min</b> ' + value + '.DT';
                    case LabelType.High:
                        return '<b>Max</b> ' + value + '.DT';
                    default:
                        return value + '.DT';
                }
            },
        };
    }

    onSendData(data) {
        this.sendData.emit({ maxValue:  data.highValue, minValue: data.value });
    }
}
