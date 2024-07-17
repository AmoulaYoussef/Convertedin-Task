import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListingStateCardComponent } from './listing-state-card.component';

describe('ListingStateCardComponent', () => {
  let component: ListingStateCardComponent;
  let fixture: ComponentFixture<ListingStateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingStateCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListingStateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
