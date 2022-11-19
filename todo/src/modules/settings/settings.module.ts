import { HttpClientModule } from '@angular/common/http';
import { Inject, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsLoaderService } from './settings-loader.service';
import { Settings, SETTINGS } from './type';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    SettingsLoaderService,
    {
      provide: SETTINGS,
      useFactory: (loader: SettingsLoaderService) => loader.settings$,
      deps: [SettingsLoaderService]
    }
  ]
})
export class SettingsModule {
  constructor(@Inject(SETTINGS) settings: Observable<Settings>) { }
}
