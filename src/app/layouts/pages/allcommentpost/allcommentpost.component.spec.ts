import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcommentpostComponent } from './allcommentpost.component';

describe('AllcommentpostComponent', () => {
  let component: AllcommentpostComponent;
  let fixture: ComponentFixture<AllcommentpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllcommentpostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllcommentpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
