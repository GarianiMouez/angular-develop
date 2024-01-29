import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuestionComponent } from './questions-list/questions.component';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: QuestionComponent }])],
})
export class QuestionRoutingModule {}
