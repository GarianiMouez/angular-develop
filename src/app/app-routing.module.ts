import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'questions',
        pathMatch: 'full',
    },

    {
        path: 'questions',
        loadChildren: () => import('./views/questions/questions.module').then((m) => m.QuestionModule),
    },
    {
        path: 'sections',
        loadChildren: () => import('./views/sections/sections.module').then((m) => m.SectionModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
