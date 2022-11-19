import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, filter, firstValueFrom, fromEvent, map, skip } from 'rxjs';
import { SyncStorageClientService, Uuid } from 'src/modules/sync-storage';

@Component({
  selector: 'todo-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPageComponent {
  public readonly id$ = new BehaviorSubject<Uuid | null>(null);

  constructor(private readonly client: SyncStorageClientService) { }

  public async upload(): Promise<void> {
    const input: HTMLInputElement = document.createElement('input');
    input.type = 'file';
    input.click();

    await firstValueFrom(fromEvent(input, 'change'))

    if ((input.files?.length ?? 0) > 0) {
      const id = await this.client.create(input.files!.item(0)!);
      this.id$.next(id);
    }
  }

  public async download(id: Uuid): Promise<void> {
    const result = await this.client.get(id);
    const url = URL.createObjectURL(result);

    window.open(url, '_blank')
  }
}
