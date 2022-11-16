import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPageComponent } from './list-page/list-page.component';
import { RouterModule } from '@angular/router';



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
    }])
  ]
})
export class ListModule { }
