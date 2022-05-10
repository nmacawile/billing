import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TemplatesService } from '../services/templates.service';
import { Template } from '../models/template';

@Injectable({
  providedIn: 'root',
})
export class TemplatesResolver implements Resolve<Template[]> {
  constructor(private templatesService: TemplatesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Template[]> {
    return this.templatesService.getTemplates();
  }
}
