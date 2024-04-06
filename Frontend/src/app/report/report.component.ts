import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [FormsModule, NgIf, HttpClientModule, NgFor],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {
  showTable: boolean = false;
  formData = {
    reg_no: '',
    from_date: '',
    firstname: '',
    to_date: '',
    mobilenumber: ''
  };
  reportData: any = [];

  constructor(private http: HttpClient) { }

  generateReport() {
    // Make POST request to the backend API
    this.http.post<any>('http://localhost:3001/patient/report', this.formData)
      .subscribe(data => {
        this.reportData = data;
        console.log(this.reportData);    
        this.showTable = true;
      }, error => {
        console.log('Error:', error);
      });
  }
}
