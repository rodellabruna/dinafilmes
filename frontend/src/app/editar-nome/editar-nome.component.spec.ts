import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarNomeComponent } from './editar-nome.component';

describe('EditarNomeComponent', () => {
  let component: EditarNomeComponent;
  let fixture: ComponentFixture<EditarNomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarNomeComponent]
    });
    fixture = TestBed.createComponent(EditarNomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
