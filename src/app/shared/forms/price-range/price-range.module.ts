import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PriceRangeComponent } from './components/price-range.component';
import { NgxSliderModule } from 'ngx-slider-v2';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [PriceRangeComponent],
    imports: [CommonModule, FormsModule, NgxSliderModule],
    exports: [PriceRangeComponent, NgxSliderModule],
})
export class PriceRangeModule {}
