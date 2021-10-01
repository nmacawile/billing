import { Component, Input, OnInit } from '@angular/core';
import { Department, DepartmentParams } from '../../models/department';
import { DepartmentsService } from '../../services/departments.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit {
  @Input('department') department: Department;
  @Input('templateId') templateId: string;

  constructor(private departmentsService: DepartmentsService) {}

  ngOnInit(): void {}

  saveDepartment(department: Department): void {
    const deptId = this.departmentId(department);
    const { department_items, ...deptParams } = department;
    this.departmentsService
      .updateDepartment(this.templateId, this.departmentId(department), deptParams)
      .subscribe();
  }

  departmentId(department: Department): string {
    return department['_id']['$oid'];
  }
}
