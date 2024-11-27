import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarEmailComponent } from './validar-email.component';

describe('ValidarEmailComponent', () => {
  let component: ValidarEmailComponent;
  let fixture: ComponentFixture<ValidarEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidarEmailComponent]
    });
    fixture = TestBed.createComponent(ValidarEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
