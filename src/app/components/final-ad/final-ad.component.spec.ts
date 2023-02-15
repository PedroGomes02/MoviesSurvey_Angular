import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalAdComponent } from './final-ad.component';

describe('FinalAdComponent', () => {
  let component: FinalAdComponent;
  let fixture: ComponentFixture<FinalAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinalAdComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FinalAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
