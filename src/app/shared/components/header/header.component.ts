import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '@convertedin/shared';
import { debounceTime, Subject, switchMap, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private destroy$ = new Subject<void>();

  menuSub: string[] = ['Electronics', 'Mobiles', 'Men', 'Women', 'Home', 'Beauty && Health', 'Baby && Toys', 'Supermarket', 'Sell On Platform', 'New Deals'];
  cartItems: any[] = [];

  productService = inject(ProductService);
  searchQuery: string = '';

  removeNotify = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  
  ngOnInit(): void {
    this.productService.cart.pipe(
      takeUntil(this.destroy$),
    ).subscribe((cart: any) => {
      this.removeNotify = true;
      this.cartItems = [...this.cartItems, cart];
    });

    this.productService.searchSubject.pipe(
        debounceTime(2000),  
        takeUntil(this.destroy$)
    ).subscribe(searchQuery => {
      this.searchQuery = searchQuery;
        this._router.navigate(['products'], {
          queryParams: {
            q: searchQuery
          },
          queryParamsHandling: 'merge'
        });
      });
    }

    onInputChange(): void {
      this.productService.searchSubject.next(this.searchQuery);
    }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
