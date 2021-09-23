import { Component, Input, OnInit } from '@angular/core';
import { Department, DepartmentParams } from '../../models/department';
import { DepartmentsService } from '../../services/departments.service';
import { Template } from '../../models/template';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit {
  @Input('department') department: Department;
  @Input('template') template: Template;
  id: string;

  constructor(private departmentsService: DepartmentsService) {}

  ngOnInit(): void {
    this.id = this.template['_id']['$oid'];
  }

  saveDepartment(department: Department): void {
    const deptId = this.departmentId(department);
    const { department_items, ...deptParams } = department as DepartmentParams;
    this.departmentsService
      .updateDepartment(this.id, this.departmentId(department), deptParams)
      .subscribe();
  }

  departmentId(department: Department): string {
    return department['_id']['$oid'];
  }
}
