import { Product } from "./product";

export interface ProductsListResponse {
    products: Product[];
    limit: number;
    skip: number;
    total: number;
}

export interface Category {
    slug: string;
    name: string;
    url: string;
}