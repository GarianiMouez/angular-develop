import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, Optional, Output, Self } from '@angular/core';
import { FormBuilder, FormGroup, ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';

/** @title Form field with custom time input control. */
@Component({
    selector: 'form-field-custom-control-example',
    templateUrl: './form-field-custom-control-example.html',
    styleUrls: ['./form-field-custom-control-example.css'],
})
export class FormFieldCustomControlExample {
    @Output('onSubmitTime') onSubmitTimeEvent = new EventEmitter<any>();

    onSendTime(time) {
        this.onSubmitTimeEvent.emit(time);
    }
}

/** Data structure for holding time. */
export class MyTime {
    constructor(public hour: string, public minute: string, public period: string) {}
}

/** Custom `MatFormFieldControl` for time input. */
@Component({
    selector: 'example-time-input',
    templateUrl: 'example-time-input-example.html',
    styleUrls: ['example-time-input-example.css'],
    providers: [{ provide: MatFormFieldControl, useExisting: MyTimeInput }],
    host: {
        '[class.example-floating]': 'shouldLabelFloat',
        '[id]': 'id',
        '[attr.aria-describedby]': 'describedBy',
    },
})
export class MyTimeInput implements ControlValueAccessor, MatFormFieldControl<MyTime>, OnDestroy {
    static nextId = 0;

    @Output('onSubmitTime') onSubmitTimeEvent = new EventEmitter<any>();

    parts: FormGroup;
    stateChanges = new Subject<void>();
    focused = false;
    errorState = false;
    controlType = 'example-time-input';
    id = `example-time-input-${MyTimeInput.nextId++}`;
    describedBy = '';
    onChange = (_: any) => {};
    onTouched = () => {};

    get empty() {
        const {
            value: { hour, minute, period },
        } = this.parts;

        return !hour && !minute && !period;
    }

    get shouldLabelFloat() {
        return this.focused || !this.empty;
    }

    @Input()
    get placeholder(): string {
        return this._placeholder;
    }
    set placeholder(value: string) {
        this._placeholder = value;
        this.stateChanges.next();
    }
    private _placeholder: string;

    @Input()
    get required(): boolean {
        return this._required;
    }
    set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    private _required = false;

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
        this._disabled ? this.parts.disable() : this.parts.enable();
        this.stateChanges.next();
    }
    private _disabled = false;

    @Input()
    get value(): MyTime | null {
        const {
            value: { hour, minute, period },
        } = this.parts;
        if (hour.length === 3 && minute.length === 3 && period.length === 4) {
            return new MyTime(hour, minute, period);
        }
        return null;
    }
    set value(time: MyTime | null) {
        const { hour, minute, period } = time || new MyTime('', '', '');
        this.parts.setValue({ hour, minute, period });
        this.stateChanges.next();
    }

    constructor(
        formBuilder: FormBuilder,
        private _focusMonitor: FocusMonitor,
        private _elementRef: ElementRef<HTMLElement>,
        @Optional() @Self() public ngControl: NgControl
    ) {
        this.parts = formBuilder.group({
            hour: '',
            minute: '',
            period: '',
        });

        _focusMonitor.monitor(_elementRef, true).subscribe((origin) => {
            if (this.focused && !origin) {
                this.onTouched();
            }
            this.focused = !!origin;
            this.stateChanges.next();
        });

        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }
    }

    ngOnDestroy() {
        this.stateChanges.complete();
        this._focusMonitor.stopMonitoring(this._elementRef);
    }

    setDescribedByIds(ids: string[]) {
        this.describedBy = ids.join(' ');
    }

    onContainerClick(event: MouseEvent) {
        if ((event.target as Element).tagName.toLowerCase() != 'input') {
            this._elementRef.nativeElement.querySelector('input')!.focus();
        }
    }

    writeValue(time: MyTime | null): void {
        this.value = time;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    _handleBlur(): void {
        const hour = this.parts.get('hour');

        if (
            hour !== null &&
            typeof hour !== 'undefined' &&
            (hour.value === null || (typeof hour.value === 'undefined' && hour.value !== ''))
        ) {
            hour.setValue(12);
        }

        this.onChange(this.parts.value);
    }

    _handleInput(): void {
        const hour = this.parts.get('hour');

        if (
            hour !== null &&
            typeof hour !== 'undefined' &&
            hour.value !== null &&
            typeof hour.value !== 'undefined' &&
            hour.value !== ''
        ) {
            if (isNaN(hour.value)) {
                hour.setValue(hour.value.replace(/\D/g, ''));
            }
            if (hour.value > 12) {
                hour.setValue(hour.value.charAt(0));
            }
        }

        const minute = this.parts.get('minute');

        if (
            minute !== null &&
            typeof minute !== 'undefined' &&
            minute.value !== null &&
            typeof minute.value !== 'undefined' &&
            minute.value !== ''
        ) {
            if (isNaN(minute.value)) {
                minute.setValue(minute.value.replace(/\D/g, ''));
            }
            if (minute.value > 59) {
                minute.setValue(minute.value.charAt(0));
            }
        }

        const period = this.parts.get('period');

        if (
            period !== null &&
            typeof period !== 'undefined' &&
            period.value !== null &&
            typeof period.value !== 'undefined' &&
            period.value !== ''
        ) {
            if (
                period.value.toUpperCase() !== 'AM' &&
                period.value.toUpperCase() !== 'PM' &&
                period.value.toUpperCase() !== 'A' &&
                period.value.toUpperCase() !== 'P' &&
                period.value.toUpperCase() !== 'M'
            ) {
                let newVal = period.value.toUpperCase().replace(/[^A|M|P]/g, '');
                newVal = newVal.replace(/AAA/g, 'A');
                newVal = newVal.replace(/AA/g, 'A');
                newVal = newVal.replace(/AAM/g, 'AM');
                newVal = newVal.replace(/AMM/g, 'AM');
                newVal = newVal.replace(/AMP/g, 'AM');
                newVal = newVal.replace(/AMA/g, 'AM');
                newVal = newVal.replace(/AAP/g, 'A');
                newVal = newVal.replace(/APP/g, 'A');
                newVal = newVal.replace(/AP/g, 'A');
                newVal = newVal.replace(/PA/g, 'P');
                newVal = newVal.replace(/PPP/g, 'P');
                newVal = newVal.replace(/PP/g, 'P');
                newVal = newVal.replace(/PPM/g, 'PM');
                newVal = newVal.replace(/PMM/g, 'PM');
                newVal = newVal.replace(/PMP/g, 'PM');
                newVal = newVal.replace(/PMA/g, 'PM');
                newVal = newVal.replace(/PPA/g, 'P');
                newVal = newVal.replace(/PAA/g, 'P');
                newVal = newVal.replace(/PA/g, 'P');
                newVal = newVal.replace(/PAM/g, 'AM');
                newVal = newVal.replace(/APM/g, 'PM');
                newVal = newVal.replace(/MMM/g, 'M');
                newVal = newVal.replace(/MM/g, 'M');
                newVal = newVal.replace(/MP/g, 'P');
                newVal = newVal.replace(/MA/g, 'A');
                newVal = newVal.replace(/MMP/g, 'P');
                newVal = newVal.replace(/MPP/g, 'P');
                newVal = newVal.replace(/MMA/g, 'A');
                newVal = newVal.replace(/MAA/g, 'A');
                newVal = newVal.replace(/MPA/g, 'A');
                newVal = newVal.replace(/MAP/g, 'P');
                newVal = newVal.replace(/MPM/g, 'PM');
                newVal = newVal.replace(/MAM/g, 'AM');
                period.setValue(newVal);
            } else {
                period.setValue(period.value.toUpperCase());
            }
        }

        this.onChange(this.parts.value);

        let time = this.getTwentyFourHourTime(this.parts.value);


        if (time !== undefined) {

            this.onSubmitTimeEvent.emit(time);
        }
    }
    getTwentyFourHourTime(amPmString) {
        let { hour, minute, period } = amPmString;

        let date = hour + ':' + minute + ' ' + period;

        if (date) {
            var d = new Date('1/1/2013 ' + date);
            if (!isNaN(d.getHours()) && !isNaN(d.getMinutes())) return d.getHours() + ':' + d.getMinutes();
        }
    }
}

/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
