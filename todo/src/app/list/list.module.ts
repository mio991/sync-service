import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPageComponent } from './list-page/list-page.component';
import { RouterModule } from '@angular/router';
import { SyncStorageModule } from 'src/modules/sync-storage';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ListPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: ListPageComponent
    }]),
    SyncStorageModule,
    MatButtonModule
  ]
})
export class ListModule { }
