import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SectionComponent } from './sections-list/sections.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: SectionComponent,
            },
        ]),
    ],
    declarations: [],
    exports: [],
})
export class SectionRoutingModule {}
