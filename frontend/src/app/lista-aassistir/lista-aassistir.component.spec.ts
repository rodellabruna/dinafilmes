import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAAssistirComponent } from './lista-aassistir.component';

describe('ListaAAssistirComponent', () => {
  let component: ListaAAssistirComponent;
  let fixture: ComponentFixture<ListaAAssistirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaAAssistirComponent]
    });
    fixture = TestBed.createComponent(ListaAAssistirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
