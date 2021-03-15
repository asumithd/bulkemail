import { ToastModule } from 'primeng-lts/toast';
import { ConfirmDialogModule } from 'primeng-lts/confirmdialog';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
        ToastModule,

    ],
    declarations: [
        
    ]
})
export class ShareModule { }
