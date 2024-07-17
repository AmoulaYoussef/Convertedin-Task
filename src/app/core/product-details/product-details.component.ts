import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PreloaderComponent, ListingStateCardComponent, Product, ResponseResult, BreadcrumbComponent } from '@convertedin/shared';
import { ProductDetailsService } from './services/product-details.service';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    InputNumberModule,
    FormsModule,
    PreloaderComponent,
    ListingStateCardComponent,
    BreadcrumbComponent
]
  ,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  private destroy$ = new Subject<void>();

  isLoading = this.productDetailsService.isLoading;
  productId!: string;
  productItem = signal<Product | undefined>(undefined);
  errorMessage = signal<string | undefined>(undefined);

  productPolicy = [
    { src: './assets/images/free_returns_usp.svg', title: 'FREE RETURNS', desc: 'Get free returns on eligible items' },
    {
      src: './assets/images/trusted_shipping_usp_v2.svg', title: 'TRUSTED SHIPPING', desc: 'Free shipping when you spend EGP 200 and above on express items' },
    { src: './assets/images/secure_usp.svg', title: 'SECURE SHOPPING', desc: 'Your data is always protected' }
  ]

  selectedQTY: string = '1';
  currentImage!: string;
  constructor(private route: ActivatedRoute, private productDetailsService: ProductDetailsService) { }
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.productDetailsService.getSingleProduct(this.productId).pipe(
      takeUntil(this.destroy$),
    ).subscribe(
      (res: ResponseResult<Product | undefined>) => {
        this.productItem.set(res.result);
        this.errorMessage.set(res.error);
      },
      (error) => {
        this.productItem.set(error.result);
        this.errorMessage.set(error.error);
      } 
    );
  }

  getCurrentImage(image: string) {
    this.currentImage = image;
  }

  addCart(product: Product) {
    this.productDetailsService.productService.cart.next({ count: this.selectedQTY, product: product })
  }

  getBreadcrumb(product: Product) {
    return [{ name: product.category }, {name: product.title}]
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
