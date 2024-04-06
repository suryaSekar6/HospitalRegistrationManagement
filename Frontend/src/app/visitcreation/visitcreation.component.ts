import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, ActivatedRoute, Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-visitcreation',
  standalone: true,
  imports: [NgFor, RouterLink, NgIf, HttpClientModule, CommonModule, RouterModule],
  templateUrl: './visitcreation.component.html',
  styleUrl: './visitcreation.component.scss'
})
export class VisitcreationComponent {

  cardData = [
    { imageUrl: "../../assets/Doctor-1.jpg", title: "DR. KAPIL KUMAR", text: "M.B.B.S, MS(ORTHO) SR.CONSULTANT(ORTHOPEDIC)", selected: false },
    { imageUrl: "../../assets/Doctor-4.jpeg", title: "DR. KALPANA TYAGI", text: "M.B.B.S, DMCH, DMA SR.CONSULTANT(OBS & GYNAECOLOGY)", selected: false },
    { imageUrl: "../../assets/Doctor-3.jpeg", title: "DR. NEERAJ AGARWAL", text: "M.B.B.S, DM - NEUROLOGY", selected: false },
    { imageUrl: "../../assets/Doctor-6.jpg", title: "DR. RAJNI FARMANIYA", text: "M.B.B.S, MS - OBSTETRICS", selected: false },
    { imageUrl: "../../assets/Doctor-2.jpeg", title: "DR. HARISH SHARMA", text: "M.B.B.S, MS - GENERAL SURGERY", selected: false },
    { imageUrl: "../../assets/Doctor-5.jpg", title: "DR. R.SUJATHA RANI", text: "M.B.B.S, DCH, SR. CONSULTANT (PAEDIATRIC)", selected: false },
  ];  

  departmentNames = [
    { name: 'Emergency Department', imageUrl: '../../assets/Emergency.jpg' },
    { name: 'Surgery Department', imageUrl: '../../assets/Surgery.webp' },
    { name: 'Cardiology Department', imageUrl: '../../assets/cardiology.jpg' },
    { name: 'Neurology Department', imageUrl: '../../assets/Neurology.jpg' },
    { name: 'Psychiatry Department', imageUrl: '../../assets/Psychiatry.jpg' },
    { name: 'Radiology Department', imageUrl: '../../assets/Radiology.jpeg' },
    { name: 'Outpatient Department', imageUrl: '../../assets/Outpatient.jpg' },
    { name: 'ENT, Department', imageUrl: '../../assets/ENT.jpg' },
    { name: 'Dental Department', imageUrl: '../../assets/dental.jpg' }
  ];

  labTestNames = [
    { name: 'ANA (Antinuclear Antibody)', imageUrl: '../../assets/antinuclear-test.jpg' },
    { name: 'Amylase Test', imageUrl: '../../assets/amylase-test.jpeg' },
    { name: 'Blood Sugar test', imageUrl: '../../assets/blood-test.webp' },
    { name: 'CT Scans', imageUrl: '../../assets/CTscan.jpg' },
    { name: 'Hemoglobin A1C (HbA1c)', imageUrl: '../../assets/heamoglobin.jpeg' },
    { name: 'CRP (C – Reactive protein)', imageUrl: '../../assets/CRP.jpg' },
    { name: 'MRI Scans', imageUrl: '../../assets/MRI.jpg' },
  ];

  selectedDepartments: string[] = [];
  selectedLabTests: string[] = [];
  registrationNumbers: string[] = [];
  urlParams: any; 
  showSuccessModal: boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log('URL Parameters:', params);
      this.urlParams = params; // Set urlParams when query params are retrieved
    });
  }

  selectCard(selectedRow: any) {
    selectedRow.selected = !selectedRow.selected;
  }

  isAnyCardSelectedExcept(selectedRow: any): boolean {
    return this.cardData.some(row => row.selected && row !== selectedRow);
  }

  toggleDepartmentSelection(department: string) {
    const index = this.selectedDepartments.indexOf(department);
    if (index === -1) {
      this.selectedDepartments.push(department);
    } else {
      this.selectedDepartments.splice(index, 1);
    }
  }

  toggleLabTestSelection(labTest: string) {
    const index = this.selectedLabTests.indexOf(labTest);
    if (index === -1) {
      this.selectedLabTests.push(labTest);
    } else {
      this.selectedLabTests.splice(index, 1);
    }
  }

  saveSelections() {
    // Ensure urlParams is available
    if (this.urlParams) {
      // Combine selected data with URL parameters
      const formData = {
        firstname: this.urlParams.firstname || '',
        lastname: this.urlParams.lastname || '',
        mobilenumber: this.urlParams.mobilenumber || '',
        prefix: this.urlParams.prefix || '',
        gender: this.urlParams.gender || '',
        address: this.urlParams.address || '',
        state: this.urlParams.state || '',
        city: this.urlParams.city || '',
        pincode: this.urlParams.pincode || '',
        doctor: this.cardData.filter(doctor => doctor.selected).map(doctor => doctor.title),
        department: this.selectedDepartments,
        treatment: this.selectedLabTests
      };
      console.log(formData);
      // Send data to API using HttpClient
      this.http.post<any>('http://localhost:3001/patient/create', formData).subscribe(
        response => {
          console.log('API Response:', response);
          if (response.type === 'sucess') {
            this.showSuccessModal = true; 
            setTimeout(() => {
              this.router.navigate(['/patientlist']); // Navigate to another component after 5 seconds
            }, 2000);
          }
          // Optionally, you can handle the response here, such as showing a success message
        },
        error => {
          console.error('Error occurred:', error);
          // Optionally, you can handle errors here, such as showing an error message
        }
      );
    } else {
      console.error('URL Parameters not available.');
    }
  }

  closeModal(): void {
    this.showSuccessModal = false;
  }
    
}