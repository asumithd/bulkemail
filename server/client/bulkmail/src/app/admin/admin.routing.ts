import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: 'sender',
                loadChildren: () => import('./sender/sender.module').then(m => m.SenderModule)
            }
        ]
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})

export class AdminRouting { }
