import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {
  
  dataSource = new EmployeeDataSource(this.employeeService);
  displayedColumns: string[] = ['rowIndex','name', 'email', 'salary', 'hireDate'];

 
  employees: Employee[];
  public fName = "";
  public test = false;
  public savedMsj = false;
  
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  constructor(public employeeService: EmployeeService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
    this.employeeService.getEmployeeList().subscribe((res) =>{
      this.employeeService.employees = res as Employee[];
      this.employees = this.employeeService.employees;
    });
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.employeeService.selectedEmployee = {
      _id: "",
      name: "",
      email: "",
      password: "",  
      salary: null,
      hireDate: null,
      typeUser: "Employee",
      sessions: []
  
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.employeeService.postEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        window.location.reload();
        this.savedMsj = true;
        setTimeout(() => this.savedMsj = false, 3000);
      });
    }
    else {
      this.employeeService.putEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        window.location.reload();
      });
    }
  }

  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
    });
  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = emp;
    window.location.reload();
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
      });
    }
  }

  Search(){
    if(this.fName != ""){
      this.employeeService.getEmployeeList().subscribe((res) =>{
        this.employeeService.employees = res as Employee[];
        
        this.employees = this.employeeService.employees;
           this.employees = this.employees.filter(res =>{
           if( res.name.toLocaleLowerCase().match(this.fName.toLocaleLowerCase()) ){   
              return res.name.toLocaleLowerCase().match(this.fName.toLocaleLowerCase());
           }else{
             this.test = !this.test;
           }
        })
      })
    }else{
      this.test = false;
      this.ngOnInit();
    }
  }

}

export class EmployeeDataSource extends DataSource<any> {
  constructor( public employeeService: EmployeeService) { 
    super();
  }

  connect() : Observable<Employee []>{
    return this.employeeService.getEmployee();
  }

  disconnect(){}
}