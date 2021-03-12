import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SenderlistComponent } from './senderlist/senderlist.component';
import { AddsenderComponent } from './addsender/addsender.component';
import { ShareModule } from '../../share/share.module';
import { SenderRoutingModule } from './sender-routinf.module';

@NgModule({
  declarations: [SenderlistComponent, AddsenderComponent],
  imports: [
    CommonModule,
    ShareModule,
    SenderRoutingModule
  ]
})
export class SenderModule { }