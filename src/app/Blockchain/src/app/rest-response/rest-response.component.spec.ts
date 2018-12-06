import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestResponseComponent } from './rest-response.component';

describe('RestResponseComponent', () => {
  let component: RestResponseComponent;
  let fixture: ComponentFixture<RestResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
