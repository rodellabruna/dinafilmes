import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaFilmeComponent } from './tela-filme.component';

describe('TelaFilmeComponent', () => {
  let component: TelaFilmeComponent;
  let fixture: ComponentFixture<TelaFilmeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TelaFilmeComponent]
    });
    fixture = TestBed.createComponent(TelaFilmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
