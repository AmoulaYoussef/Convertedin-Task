import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloaderComponent, ListingStateCardComponent, ProductCardComponent, PaginatorComponent, Product, BreadcrumbComponent } from '@convertedin/shared';
import { ProductListService } from './services/product-list.service';
import { CategorySectionComponent } from './category-section/category-section.component';
import { BrandSectionComponent } from './brand-section/brand-section.component';
import { ProductRatingSectionComponent } from './product-rating-section/product-rating-section.component';
import { Router } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    InputNumberModule,
    FormsModule,
    PreloaderComponent,
    ListingStateCardComponent,
    ProductCardComponent,
    PaginatorComponent,
    CategorySectionComponent,
    BrandSectionComponent,
    ProductRatingSectionComponent,
    BreadcrumbComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  productListService = inject(ProductListService);
  private router = inject(Router)
  
  assetUrl = './assets/images/result-icon.png';
  isLoading = this.productListService.isLoading;
  totalCount = this.productListService.totalCount;
  items = this.productListService.productItems;
  errorMessage = this.productListService.productErrors;
  catagories$ = this.productListService.getAllcategory();

  from!: number;
  to!: number;
  trackBy(item: any) {
    return item.id
  }

  routeToDetails(item: Product) {
    this.router.navigate([`product-details/${item.id}`]);
  }

  getBreadcrumb() {
    return this.productListService.breadcrumb;
  }
}
