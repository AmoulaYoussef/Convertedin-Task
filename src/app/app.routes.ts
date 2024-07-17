import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./core/products/products.component').then(
                m => m.ProductsComponent
            )
    },
    {
        path: 'product-details/:id',
        loadComponent: () =>
            import('./core/product-details/product-details.component').then(
                m => m.ProductDetailsComponent
            )
    },
];
