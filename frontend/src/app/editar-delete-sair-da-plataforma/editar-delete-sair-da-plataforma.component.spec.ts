import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDeleteSairDaPlataformaComponent } from './editar-delete-sair-da-plataforma.component';

describe('EditarDeleteSairDaPlataformaComponent', () => {
  let component: EditarDeleteSairDaPlataformaComponent;
  let fixture: ComponentFixture<EditarDeleteSairDaPlataformaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarDeleteSairDaPlataformaComponent]
    });
    fixture = TestBed.createComponent(EditarDeleteSairDaPlataformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
