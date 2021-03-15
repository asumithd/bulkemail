import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';
import { AdminRouting } from './admin.routing';


@NgModule({
    imports: [
        CommonModule,
        AdminRouting,
        ShareModule
    ],
    declarations: [
        AdminComponent,
    ]
})

export class AdminModule { }
