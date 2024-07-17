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
  categoriesURL = 'https://dummyjson.com/products/categories';
  
  cart = new Subject<any>();

  private http = inject(HttpClient);

  getProducts(queryObj: any, category: string, q: string): Observable<ProductsListResponse> {
    let params = setQueryParams({ ...queryObj });
    params = params.set('select', 'title,price,rating,minimumOrderQuantity,thumbnail');    
    if (q != null && q != '') {
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

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesURL)
  }
}
