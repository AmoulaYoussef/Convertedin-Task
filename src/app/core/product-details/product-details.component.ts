import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';
import { PreloaderComponent, ListingStateCardComponent, Product, ResponseResult } from '@convertedin/shared';
import { ProductDetailsService } from './services/product-details.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    PreloaderComponent,
    ListingStateCardComponent,]
  ,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  private destroy$ = new Subject<void>();

  assetUrl = 'environment.assetUrl';
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

  selectedQTY!: string;
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

  addCart() {

  }

  getQTYOptions(stock: number) {
    let list = [];
    for (let index = 1; index <= stock; index++) {
      list.push({ name: `QTY ${index}`, value: index });
    }
    return list
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
