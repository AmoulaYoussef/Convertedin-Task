import { inject, Injectable, signal } from '@angular/core';
import { Product, ProductService, ResponseResult } from '@convertedin/shared';
import { map, catchError, of, Observable, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
 
  productService = inject(ProductService);
  isLoading = signal<boolean>(false);

  getSingleProduct(id: string): Observable<ResponseResult<Product | undefined>> {
    this.isLoading.set(true);
    return this.productService.getSingleProduct(id).pipe(
      map(res => ({ result: res, error: undefined })),
      catchError(err => of({ result: undefined, error: err?.error?.title || 'internalError' })),
      finalize(() => this.isLoading.set(false))
    );
  }
}