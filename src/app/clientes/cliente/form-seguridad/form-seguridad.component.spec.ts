import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSeguridadComponent } from './form-seguridad.component';

describe('FormSeguridadComponent', () => {
  let component: FormSeguridadComponent;
  let fixture: ComponentFixture<FormSeguridadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSeguridadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSeguridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
