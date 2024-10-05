import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PageSection } from '../interfaces/scroll.interface';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  pageSection: Subject<PageSection> = new Subject<PageSection>();

  constructor() {}
}
