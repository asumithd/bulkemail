import { AddsenderComponent } from './addsender/addsender.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SenderlistComponent } from './senderlist/senderlist.component'; 

const routes: Routes = [
  {
    path: '',
    component: SenderlistComponent
  },
  {
    path: 'senderlist',
    component: SenderlistComponent
  },
  {
    path: 'addsender',
    component: AddsenderComponent
  },
  {
    path: 'editsender/:id',
    component: AddsenderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SenderRoutingModule { }
