import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'products'
    },
    {
        path: 'products',
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
    {
        path: '**', pathMatch: 'full',
        loadComponent: () =>
            import('./shared/components/page-not-found/page-not-found.component').then(
                m => m.PageNotFoundComponent
            )
    },
];
