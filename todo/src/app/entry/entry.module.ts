import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EntryComponent } from './entry.component';


const routes: Routes = [
  { path: '', component: EntryComponent }
];

@NgModule({
  declarations: [
    EntryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class EntryModule { }
