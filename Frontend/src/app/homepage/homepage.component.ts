import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})

export class HomepageComponent implements OnInit{

  products : any= [];


  constructor(private router : Router){ 
  }

  ngOnInit(): void {
    
    // let sessUser = sessionStorage.getItem('user') || '';
    // if(sessUser == ''){
    //   this.router.navigate(['/login']);
    // }

    this.products = ["Nebulizer", "Defibrillator", "ECG", "Cardiac Monitor", "Pulse Oximeter","Laboratory and Pharmacy 24x7"];
  }
}

