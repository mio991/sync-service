import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SettingsModule } from '../settings';
import { SyncStorageClientService } from './client.service';



@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    SettingsModule
  ],
  providers: [
    SyncStorageClientService
  ]
})
export class SyncStorageModule { }
