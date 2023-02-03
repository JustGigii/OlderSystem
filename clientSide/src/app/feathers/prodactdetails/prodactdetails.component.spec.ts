import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdactdetailsComponent } from './prodactdetails.component';

describe('ProdactdetailsComponent', () => {
  let component: ProdactdetailsComponent;
  let fixture: ComponentFixture<ProdactdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdactdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdactdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
