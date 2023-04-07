import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: [
    './employee-add.component.scss',
    './../../app.component.scss'
  ]
})

export class EmployeeAddComponent implements OnInit{
  
  employeeForm!: FormGroup;
  alreadySubmit = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ){}

  ngOnInit(): void {
    let self = this;
    this.employeeForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
      birthDate: ['', Validators.required],
      basicSalary: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required] 
    });
    
    $('#birthDate').datepicker({
      dateFormat: 'dd MM yy',
      minDate: new Date(1980, 1-1, 1),
      maxDate: new Date(),
      defaultDate: new Date(2000, 1-1, 1),
      autoclose: true,
      onSelect: function(d: any, i:any){
        self.employeeFormControl['birthDate'].setValue((i['selectedMonth']+1)+'/'+(i['selectedDay']+1)+'/'+i['selectedYear'])
      }
    });
  }

  get employeeFormControl() {
    return this.employeeForm.controls;
  }

  onCancel(){
    history.back();
  }

  onSubmit(){
    this.alreadySubmit = true;

    console.log(this.employeeForm.getRawValue())
    if(this.employeeForm.valid){
      const temp = localStorage.getItem('employeeData');
      let employeeData = temp ? JSON.parse(temp) : [];
      let body = this.employeeForm.getRawValue()
      employeeData.push({
        ...body,
        status: true,
        id: employeeData.length+1,
        concatString: body['username']+' '+body['firstName']+' '+body['lastName']+' '+body['email']
      });

      localStorage.setItem('employeeData', JSON.stringify(employeeData));
      this.onCancel();
    }
  }


}
