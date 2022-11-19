import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { string, object, TypeOf } from "zod";

export const Settings = object({
    syncStorage: string({
        description: 'url to the sync storage backend.'
    }).url('')
})

export type Settings = TypeOf<typeof Settings>;

export const SETTINGS = new InjectionToken<Observable<Settings>>("SETTINGS")