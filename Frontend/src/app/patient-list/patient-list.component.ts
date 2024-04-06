import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [NgFor, MatIconModule, FormsModule, NgIf, RouterLink, HttpClientModule],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss'
})

export class PatientListComponent implements OnInit {
  
  deleteModalVisible: boolean = false;

  data: any[] = [];
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchDataFromDB();
  }

  fetchDataFromDB(): void {
    this.http.get<any>('http://localhost:3001/patient').subscribe(
      response => {
        if (response.type === 'sucess') {
          this.data = response.data;
          console.log(response.data);
        } else {
          console.error('Error fetching data:', response);
        }
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  saveChanges(): void {
    this.http.put<any>(`http://localhost:3001/patient/edit/${this.selectedRow.patient_uid}`, this.selectedRow).subscribe(
      response => {
        console.log('Data updated successfully:', response);
        // Optionally, you can update the local data array if needed
      },
      error => {
        console.error('Error updating data:', error);
      }
    );
  }

  confirmDelete(): void {
    this.http.delete<any>(`http://localhost:3001/patient/delete/${this.selectedRow.patient_uid}`).subscribe(
      response => {
        console.log('Data deleted successfully:', response);
        // Set flag to close modal
        this.deleteModalVisible = false;
        // Refresh data after a delay to ensure deletion operation completes
        setTimeout(() => {
          this.fetchDataFromDB(); // Refresh data
          this.selectedRow = {}; // Clear selected row
        }, 500); // Adjust the delay as needed
      },
      error => {
        console.error('Error deleting data:', error);
      }
    );
  }  

  openDeleteModal(patient: any): void {
    this.selectedRow = { ...patient }; // Copy rowData to selectedRow
  }
  
  selectedRow: any = {}; // Property to hold selected row data

  openModal(patient: any): void {
    this.selectedRow = { ...patient }; // Copy rowData to selectedRow
  }

  fname: string = '';
  lname: string = '';
  mobno: string = '';

  fnameMsg: string = '';
  lnameMsg: string = '';
  mobnoMsg: string = '';

  isValidfname: boolean = false;
  isValidlname: boolean = false;
  isValidmobno: boolean = false;

  validateForm(): void {
    this.validateFirstName();
    this.validateLastName();
    this.validateMobileNumber();
  }

  validateFirstName(): void {
    this.fnameMsg = '';
    this.isValidfname = /^[A-Za-z\s]+$/.test(this.fname.trim());
    if (!this.isValidfname) {
        this.fnameMsg = 'Invalid';
    }
}

validateLastName(): void {
    this.lnameMsg = '';
    this.isValidlname = /^[A-Za-z\s]+$/.test(this.lname.trim());
    if (!this.isValidlname) {
        this.lnameMsg = 'Invalid';
    }
}


  validateMobileNumber(): void {
    const mobPt = '^[6-9]+[0-9]{9}$';
    const mobRgEx = new RegExp(mobPt);
    this.mobnoMsg = '';
    this.isValidmobno = mobRgEx.test(this.mobno);
    if (!this.isValidmobno) {
      this.mobnoMsg = 'Invalid Mobile';
    }
  }

  submitForm(): void {
    this.validateForm();
    if (this.isValidfname && this.isValidlname && this.isValidmobno) {
      // Redirect to payment or further action
      console.log('Form submitted successfully');
    }
  }
}
