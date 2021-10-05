import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Template } from '../models/template';
import { Department } from '../models/department';
import { Item } from '../models/item';
import { DepartmentsService } from '../services/departments.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
})
export class DepartmentsComponent implements OnInit {
  template: Template;
  departments: Department[];
  title: string;
  id: string;

  items: Item[] = [];

  constructor(
    private route: ActivatedRoute,
    private departmentsService: DepartmentsService,
  ) {
    this.template = this.route.parent?.snapshot.data.template;
    this.title = this.template.name;
    this.id = this.template['_id']['$oid'];
    this.departments = this.template.departments || [];
  }

  ngOnInit(): void {}

  addNewDepartment(): void {
    this.departmentsService
      .createDepartment(this.id, { name: '' })
      .subscribe(({ id }) => {
        const department = {
          _id: { $oid: id },
          name: '',
          department_items: [],
        } as Department;
        this.departments.push(department);
      });
  }
}
