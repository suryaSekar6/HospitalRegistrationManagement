import { CommonModule, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-registrationform',
  standalone: true,
  imports: [FormsModule, NgIf, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './registrationform.component.html',
  styleUrls: ['./registrationform.component.scss'],
})
export class RegistrationformComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {} // Inject HttpClient here
  // constructor(private router: Router) {}


  fname: string = '';
  lname: string = '';
  mobno: string = '';
  mrMrs: string = '';
  dob: Date = new Date(); // or initialize with an appropriate default date

  fnameMsg: string = '';
  lnameMsg: string = '';
  mobnoMsg: string = '';
  mrMrsMsg: string = '';
  dobMsg: string = '';
  age: number | null = null;
  showSuccessModal: boolean = false;

  isValidfname: boolean = false;
  isValidlname: boolean = false;
  isValidmobno: boolean = false;
  isValidMrMrs: boolean = false;
  isValiddob: boolean = false;

  ngOnInit(): void {}

  validateForm(): void {
    this.validateFirstName();
    this.validateLastName();
    this.validateMobileNumber();
    this.validateMrMrs();
    this.validateDateOfBirth();
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

  validateMrMrs(): void {
    this.mrMrsMsg = '';
    this.isValidMrMrs = /^[A-Za-z\s]+$/.test(this.mrMrs.trim());
    if (!this.isValidMrMrs) {
      this.mrMrsMsg = 'Invalid';
    }
  }

  validateDateOfBirth(): void {
    this.dobMsg = '';
    this.isValiddob = !!this.dob;
    if (!this.isValiddob) {
      this.dobMsg = 'Date of Birth is required';
    } else {
      // Calculate age
      const today = new Date();
      const birthDate = new Date(this.dob);

      // Calculate the difference in years
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      // If the birth month is ahead of the current month, decrease the age by 1
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      // Update the age
      this.age = age;
    }
  }

  submitForm(): void {
    this.validateForm();
    if (this.isValidfname && this.isValidlname && this.isValidmobno && this.isValidMrMrs && this.isValiddob) {
      const formData = {
        firstname: this.fname,
        lastname: this.lname,
        mobilenumber: this.mobno,
        prefix: this.mrMrs, // Mapping mrMrs to prefix
        gender: (document.getElementById('gender') as HTMLSelectElement).value, // Getting gender from a select element
        address: (document.getElementById('address') as HTMLInputElement).value,
        state: (document.getElementById('state') as HTMLSelectElement).value,
        city: (document.getElementById('city') as HTMLInputElement).value,
        pincode: (document.getElementById('code') as HTMLInputElement).value,
      };
  
      // Construct URL with form data
      const queryParams = new URLSearchParams(formData).toString();
      const url = `/purpose?${queryParams}`;
      
      // Navigate to the URL
      this.router.navigateByUrl(url);
    }
  }  

  closeModal(): void {
    this.showSuccessModal = false;
  }
}
