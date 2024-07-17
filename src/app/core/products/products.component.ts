import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { environment } from '@environment/*';
import { PreloaderComponent, ListingStateCardComponent, ProductCardComponent, PaginatorComponent, Product } from '@convertedin/shared';
import { ProductListService } from './services/product-list.service';
import { CategorySectionComponent } from './category-section/category-section.component';
import { BrandSectionComponent } from './brand-section/brand-section.component';
import { ProductRatingSectionComponent } from './product-rating-section/product-rating-section.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    PreloaderComponent,
    ListingStateCardComponent,
    ProductCardComponent,
    PaginatorComponent,
    CategorySectionComponent,
    BrandSectionComponent,
    ProductRatingSectionComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  productListService = inject(ProductListService);
  private router = inject(Router)
  
  assetUrl = 'environment.assetUrl';
  isLoading = this.productListService.isLoading;
  totalCount = this.productListService.totalCount;
  items = this.productListService.productItems;
  errorMessage = this.productListService.productErrors;
  catagories$ = this.productListService.getAllcategory();

  trackBy(item: any) {
    return item.id
  }

  routeToDetails(item: Product) {
    this.router.navigate([`product-details/${item.id}`]);
  }
}
