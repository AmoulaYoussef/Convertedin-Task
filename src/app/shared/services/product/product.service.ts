import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { setQueryParams } from '../../utilities/setQueryParams';
import { Observable, Subject } from 'rxjs';
import { Category, ProductsListResponse } from '../../models/products-list';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productsURl = 'https://dummyjson.com/products';
  categoriesURL = 'https://dummyjson.com/products/category-list';
  
  cart = new Subject<any>();
  searchSubject = new Subject<string>();

  private http = inject(HttpClient);

  getProducts(queryObj: any, category: string, q: string): Observable<ProductsListResponse> {
    let params = setQueryParams({ ...queryObj });
    params = params.set('select', 'title,price,rating,minimumOrderQuantity,thumbnail');    
    if (q != null && q != '') {
      this.searchSubject.next(q);
      return this.http.get<ProductsListResponse>(`${this.productsURl}/search/`, { params })
    } else if (category != null && category != '') {
      return this.http.get<ProductsListResponse>(`${this.productsURl}/category/${category}`, { params })
    } else {
      return this.http.get<ProductsListResponse>(this.productsURl, { params})
    }
  }

  getSingleProduct(id: any): Observable<Product> {
    return this.http.get<Product>(this.productsURl + '/' + id);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.categoriesURL)
  }
}
