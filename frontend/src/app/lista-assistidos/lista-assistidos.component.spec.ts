import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAssistidosComponent } from './lista-assistidos.component';

describe('ListaAssistidosComponent', () => {
  let component: ListaAssistidosComponent;
  let fixture: ComponentFixture<ListaAssistidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaAssistidosComponent]
    });
    fixture = TestBed.createComponent(ListaAssistidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
