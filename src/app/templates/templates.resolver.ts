import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TemplatesService } from './templates.service';
import { Template } from '../models/template';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TemplatesResolver implements Resolve<Template> {
  constructor(private templatesService: TemplatesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Template> {
    const templateId: string = route.params.id;
    return this.templatesService.getTemplate(templateId);
  }
}
