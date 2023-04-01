import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiLoadingErrorComponent } from './api-loading-error.component';

describe('ApiLoadingErrorComponent', () => {
  let component: ApiLoadingErrorComponent;
  let fixture: ComponentFixture<ApiLoadingErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiLoadingErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiLoadingErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
