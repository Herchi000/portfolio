import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PageSection } from '../interfaces/scroll.interface';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  pageSection: Subject<PageSection> = new Subject<PageSection>();

  constructor() {}
}
