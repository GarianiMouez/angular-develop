import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../../material.module';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
    imports: [TranslateModule, MaterialModule, CommonModule, RouterModule],
    declarations: [UserProfileComponent],
    exports: [UserProfileComponent],
})
export class HeaderSharedModule {}
