import { ProductCategory } from './product-category';

export class Product {
    public productId:string;
    public productName:string;
    public productPrice:number;
    public productQuantity:number;
    public productColor:string;
    public productImageUrl:string;
    public productSpecification:string;
    public productCategory: ProductCategory;
    public isDeleted: number;
}
