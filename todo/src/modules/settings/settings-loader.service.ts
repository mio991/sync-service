import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { map, Observable, ReplaySubject, Subscription } from 'rxjs';
import { Settings } from './type';

@Injectable()
export class SettingsLoaderService implements OnDestroy {
  private readonly subscription = new Subscription();

  public readonly settings$: Observable<Settings>;

  constructor(http: HttpClient) {
    const settings$ = new ReplaySubject<Settings>(1);
    this.settings$ = settings$.asObservable();

    this.subscription.add(
      http.get<unknown>('./config/settings.json')
        .pipe(map(res => Settings.parse(res)))
        .subscribe(res => settings$.next(res))
    )
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

//UnsubscribeOnDestroy(SettingsLoaderService, 'subscription')