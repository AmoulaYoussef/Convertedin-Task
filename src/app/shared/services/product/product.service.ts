import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { setQueryParams } from '../../utilities/setQueryParams';
import { Observable } from 'rxjs';
import { Category, ProductsListResponse } from '../../models/products-list';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productsURl = 'https://dummyjson.com/products';
  categoriesURL = 'https://dummyjson.com/products/categories'

  private http = inject(HttpClient);

  getProducts(queryObj: any): Observable<ProductsListResponse> {
    let params = setQueryParams({ ...queryObj });
    params = params.set('select', 'title,price,rating,minimumOrderQuantity,thumbnail');    
    return this.http.get<ProductsListResponse>(this.productsURl, { params})
  }

  getSingleProduct(id: any): Observable<Product> {
    return this.http.get<Product>(this.productsURl + '/' + id);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesURL)
  }
}
