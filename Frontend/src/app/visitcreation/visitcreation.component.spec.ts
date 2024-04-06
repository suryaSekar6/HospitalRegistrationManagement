import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitcreationComponent } from './visitcreation.component';

describe('VisitcreationComponent', () => {
  let component: VisitcreationComponent;
  let fixture: ComponentFixture<VisitcreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitcreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisitcreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
