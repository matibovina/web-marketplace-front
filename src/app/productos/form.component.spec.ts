import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductoComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormProductoComponent;
  let fixture: ComponentFixture<FormProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormProductoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
