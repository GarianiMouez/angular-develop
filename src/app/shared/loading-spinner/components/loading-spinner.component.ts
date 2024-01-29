import { Component } from '@angular/core';

@Component({
    selector: 'app-loading-spinner',
    template:
        '  <div class="container-fluid mt-5"  style="color:red !important"> <div class="row justify-content-center"  style="color:red !important">  <div class="lds-ring" style="color:red !important"><div></div><div></div><div></div><div></div></div> </div> </div> ',
    styleUrls: ['./loading-spinner.component.css'],
})
export class LoadingSpinnerComponent {}
