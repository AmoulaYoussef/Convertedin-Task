import { computed, inject, Injectable, signal } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product, ProductService, ProductsListResponse, ResponseResult } from '@convertedin/shared';
import { catchError, finalize, map, Observable, of, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  productService = inject(ProductService);
  constructor(private route: ActivatedRoute) { }

  totalCount = signal<number>(0)
  isLoading = signal<boolean>(false);
  items = this.route.queryParamMap.pipe(
    tap(() => this.isLoading.set(true)),
    switchMap((params: ParamMap) => {
      const filterObj: any = {};
      params.keys.forEach((key) => {
        filterObj[key] = params.get(key);
      })
      filterObj.limit = 20;
      filterObj.skip = (filterObj.page - 1) * 20 || 0;
      return this.getAllProducts(filterObj, filterObj.category, filterObj.q).pipe(
        map((res) => res.products),
        map((res) => ({ result: res, error: undefined })),
        catchError((err) => {
          return of({ result: undefined, error: err?.error?.title || 'internalError' })
        })
      )
    }),
  );
  itemsSignal = toSignal<ResponseResult<Product[] | undefined>>(this.items)
  productItems = computed(() => this.itemsSignal()?.result)
  productErrors = computed(() => this.itemsSignal()?.error)
  getAllProducts(queryObj: any, category: string, q: string): Observable<ProductsListResponse> {
    this.isLoading.set(true)
    return this.productService.getProducts(queryObj, category, q).pipe(
      tap((res) => this.totalCount.set(res.total)),
      finalize(() => this.isLoading.set(false))
    )
  }

  getAllcategory() {
    return this.productService.getCategories();
  }
}
