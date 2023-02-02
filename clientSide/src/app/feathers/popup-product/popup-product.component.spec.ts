import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupProductComponent } from './popup-product.component';

describe('PopupProductComponent', () => {
  let component: PopupProductComponent;
  let fixture: ComponentFixture<PopupProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
