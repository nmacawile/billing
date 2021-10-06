import { Component, Input, OnInit } from '@angular/core';
import { Department, DepartmentParams } from '../../models/department';
import { DepartmentsService } from '../../services/departments.service';
import { SharedService } from '../../shared/shared.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit {
  @Input('departments') departments: Department[];
  @Input('department') department: Department;
  @Input('templateId') templateId: string;

  constructor(
    private departmentsService: DepartmentsService,
    private sharedService: SharedService,
  ) {}

  ngOnInit(): void {
    this.department.department_items = this.department.department_items || [];
  }

  saveDepartment(department: Department): void {
    const { department_items, ...deptParams } = department;
    this.departmentsService
      .updateDepartment(this.templateId, this.id, deptParams)
      .subscribe();
  }

  deleteDepartment(): void {
    this.delete$.subscribe(() => {
      const index = this.departments.indexOf(this.department);
      this.departments.splice(index, 1);
    });
  }

  get id(): string {
    return this.department['_id']['$oid'];
  }

  private get delete$(): Observable<void> {
    const delete$ = this.departmentsService.deleteDepartment(
      this.templateId,
      this.id,
    );
    return this.department.department_items.length > 0
      ? this.sharedService
          .confirmDeleteDialog(this.department.name || 'untitled department')
          .pipe(switchMap(() => delete$))
      : delete$;
  }
}
