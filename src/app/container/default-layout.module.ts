import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FooterComponent } from './footer/footer.component';
import { headerComponent } from './header/header.component';
import { HeaderSharedModule } from '../shared/header/header-shared.module';
import { SidebarComponent } from './side-bar/side-bar.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [headerComponent, FooterComponent, SidebarComponent],
    imports: [CommonModule, MaterialModule, RouterModule, TranslateModule,HeaderSharedModule],
    exports: [headerComponent, FooterComponent, SidebarComponent],
})
export class DefaultLayoutModule {}
