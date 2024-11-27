import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatosRecebidosComponent } from './contatos-recebidos.component';

describe('ContatosRecebidosComponent', () => {
  let component: ContatosRecebidosComponent;
  let fixture: ComponentFixture<ContatosRecebidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContatosRecebidosComponent]
    });
    fixture = TestBed.createComponent(ContatosRecebidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
