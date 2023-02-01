import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpProductComponent } from './pop-up-product.component';

describe('PopUpProductComponent', () => {
  let component: PopUpProductComponent;
  let fixture: ComponentFixture<PopUpProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
