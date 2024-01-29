import { NgModule } from '@angular/core';

import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
    imports: [ButtonsModule.forRoot(), AlertModule.forRoot(), ModalModule.forRoot()],
    declarations: [],
    exports: [ButtonsModule, AlertModule, ModalModule],
})
export class NgxBootstrapModule {}
