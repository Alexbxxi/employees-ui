import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  constructor(public employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  resetForm(form: NgForm) {
    form.reset();
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(
      (res) => {
        this.employeeService.employees = res;
      },
      (err) => console.log(err)
    );
  }

  createEmployee(form: NgForm) {
    if (form.value._id) {
      this.employeeService.updateEmployee(form.value).subscribe(
        (res) => {
          this.getEmployees(), 
          form.reset(),
          console.log(res);
        },
        (err) => console.log(err)
      );
    } else {
      this.employeeService.createEmploye(form.value).subscribe(
        (res) => {
          this.getEmployees(),
          form.reset(),
          console.log(res);
        },
        (err) => console.log(err)
      );
    }
  }

  deleteEmployee(_id: string) {
    const res = confirm('Are you sure you want to delete it?');
    if (res == true) {
      this.employeeService.deleteEmployee(_id).subscribe(
        (res) => {
          this.getEmployees();
        },
        (err) => console.log(err)
      );
    }
  }

  editEmployee(employee: Employee) {
    this.employeeService.selectedEmployee = employee;
  }
}
