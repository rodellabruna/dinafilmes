import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFavoritosComponent } from './lista-favoritos.component';

describe('ListaFavoritosComponent', () => {
  let component: ListaFavoritosComponent;
  let fixture: ComponentFixture<ListaFavoritosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaFavoritosComponent]
    });
    fixture = TestBed.createComponent(ListaFavoritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
