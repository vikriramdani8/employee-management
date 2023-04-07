import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit{
  
  dataEmployee: any = [];
  listEmployee: any = [];
  searchControl = new FormControl();
  limitPerPage = new FormControl();
  filteredOptions: Observable<string[]> | undefined;
  
  numberOfItems = 0;
  numberPerPage = 10;
  currentPage = 1;
  numberOfPages = 0;

  statusFilter = false;
  status = false;

  currentSort = 'DESC';

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ){}

  ngOnInit(): void {
    let temp = localStorage.getItem('employeeData');
    this.dataEmployee = temp ? JSON.parse(temp) : [];
    this.limitPerPage.setValue(this.numberPerPage);
    this.sortByUsername();

    this.searchControl.valueChanges.subscribe((value) => {
      this._filter(value)
    });

    this.limitPerPage.valueChanges.subscribe((value) => {
      this.currentPage = 1;
      this.numberPerPage = +value;
      
      this.searchControl.setValue("");
      this.buildPage(this.dataEmployee);
    });
  }

  buildPage(arr: any){
    this.numberOfItems = arr.length;
    this.numberOfPages = Math.ceil(this.numberOfItems/this.numberPerPage);
    
    if (this.numberOfPages < this.currentPage) {
      this.currentPage = 1;
    }

    let trimStart = (this.currentPage - 1) * this.numberPerPage
    let trimEnd = trimStart + this.numberPerPage
    
    this.listEmployee = arr.slice(trimStart, trimEnd);
  }

  changePage(pages: number){
    this.currentPage = pages;
    this._filter(this.searchControl.value);
  }

  filterByStatus(event: any){
    this.currentPage = 1;
    if(event.target.value == 'nofilter'){
      this.statusFilter = false;
    } else {
      this.statusFilter = true;
      this.status = event.target.value == 'active';
    }

    this._filter(this.searchControl.value);
  }

  sortByUsername(){
    this.currentSort = this.currentSort == 'ASC' ? 'DESC' : 'ASC';
    if(this.currentSort == 'ASC'){
      this.dataEmployee.sort(function(a: any, b: any) {
        if (a.username < b.username) {
          return -1;
        }
        if (a.username > b.username) {
          return 1;
        }
        return 0;
      });
    } else {
      this.dataEmployee.sort(function(a: any, b: any) {
        if (a.username < b.username) {
          return 1;
        }
        if (a.username > b.username) {
          return -1;
        }
        return 0;
      });
    }

    this._filter(this.searchControl.value);
  }

  private _filter(value: any) {
    const filterValue = value ? value.toLowerCase() : "";
    if(this.statusFilter){
      this.buildPage(
        this.dataEmployee.filter((data: any) => {
          return data['concatString'].toLowerCase().includes(filterValue) &&
          data['status'] == this.status
        })
      );

    } else {
      this.buildPage(this.dataEmployee.filter((data: any) => data['concatString'].toLowerCase().includes(filterValue)));
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
