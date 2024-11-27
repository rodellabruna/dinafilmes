import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';  // Para trabalhar com formulários reativos
import { SobreComponent } from './sobre.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Para simular as requisições HTTP

describe('SobreComponent', () => {
  let component: SobreComponent;
  let fixture: ComponentFixture<SobreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SobreComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule]  // Importando ReactiveFormsModule para o formulário reativo
    });
    fixture = TestBed.createComponent(SobreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
