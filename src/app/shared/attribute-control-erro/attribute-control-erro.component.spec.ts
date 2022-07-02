import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeControlErroComponent } from './attribute-control-erro.component';

describe('AttributeControlErroComponent', () => {
  let component: AttributeControlErroComponent;
  let fixture: ComponentFixture<AttributeControlErroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributeControlErroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeControlErroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
