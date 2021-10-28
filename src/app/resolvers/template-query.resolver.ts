import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Template } from '../models/template';
import { TemplatesService } from '../services/templates.service';

@Injectable({
  providedIn: 'root',
})
export class TemplateQueryResolver implements Resolve<Template | null> {
  constructor(private templatesService: TemplatesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Template | null> {
    const id = route.queryParams.template;
    if (!id) return of(null);
    return this.templatesService.getTemplate(id);
  }
}
