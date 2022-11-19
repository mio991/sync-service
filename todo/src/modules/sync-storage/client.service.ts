import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { firstValueFrom, map, Observable } from 'rxjs';
import { string } from 'zod';
import { Settings, SETTINGS } from '../settings';

export type Uuid = string;

@Injectable()
export class SyncStorageClientService {
  private readonly baseUrl$: Observable<string>;

  constructor(@Inject(SETTINGS) settings: Observable<Settings>, private readonly http: HttpClient) {
    this.baseUrl$ = settings.pipe(map(({ syncStorage }) => syncStorage))
  }

  public async create(blob: Blob): Promise<Uuid> {
    const baseUrl = await firstValueFrom(this.baseUrl$);

    return await firstValueFrom(this.http.post(baseUrl, blob, { responseType: 'text' }))
  }

  public async update(id: Uuid, blob: Blob): Promise<void> {
    const baseUrl = await firstValueFrom(this.baseUrl$);

    await firstValueFrom(this.http.put(`${baseUrl}/${id}`, blob))
  }

  public async get(id: Uuid): Promise<Blob> {
    const baseUrl = await firstValueFrom(this.baseUrl$);

    return await firstValueFrom(this.http.get(`${baseUrl}/${id}`, { responseType: 'blob' }))
  }
}
