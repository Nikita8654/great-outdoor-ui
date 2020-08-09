import { Address } from './address';
import { Product } from './product';

export class OrderModel {
    id:number;
    orderId:string;
	userId:string;
	addressId:string;
	productId:string;
    price:number;	 
	paymentType:string;
    itemQuantity:number;
	dispatchStatus:number;
	orderInitiateTime:Date;
    orderDispatchTime:Date;
    addressModel:Address;
	productModel:Product;
}
