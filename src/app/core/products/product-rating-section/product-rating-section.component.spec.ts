import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRatingSectionComponent } from './product-rating-section.component';

describe('ProductRatingSectionComponent', () => {
  let component: ProductRatingSectionComponent;
  let fixture: ComponentFixture<ProductRatingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductRatingSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductRatingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
