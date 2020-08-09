export class CartItem {
    public cartId:number;
    public userId:string;
    public productId:string;
    public cartItemPrice:number;
    public productName:string;
    public productCategory:string;
    public productColor:string;
    public actualProductPrice:number;
    public quantity:number;


    constructor(cartId:number,userName:string,productId:string,productPrice:number,quantity:number){
        this.cartId=cartId;
        this.userId=userName;
        this.productId=productId;
        this.cartItemPrice=productPrice;
        this.quantity=quantity

    }
}
