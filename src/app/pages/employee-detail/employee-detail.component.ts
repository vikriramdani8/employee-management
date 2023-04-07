import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: [
    './employee-detail.component.scss',
    './../../app.component.scss'
  ]
})
export class EmployeeDetailComponent implements OnInit{

  id: any = 0;
  dataEmployee: any = [];
  employee: any = {};

  constructor(
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    let temp = localStorage.getItem('employeeData');
    this.dataEmployee = temp ? JSON.parse(temp) : [];
    this.employee = this.dataEmployee.filter((data: any) => data['id'] == this.id)[0];
  }

  back(){
    history.back();
  }

}
