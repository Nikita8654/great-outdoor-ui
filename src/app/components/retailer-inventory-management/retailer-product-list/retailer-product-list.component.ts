import {Component, OnInit} from '@angular/core';
import {RetailerInventoryProduct} from 'src/app/models/retailer-inventory-product';
import {RetailerInventoryProductService} from 'src/app/services/retailer-inventory-product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-retailer-product-list',
  templateUrl: './retailer-product-list.component.html',
  styleUrls: ['./retailer-product-list.component.css']
})
export class RetailerProductListComponent implements OnInit {

  productList: RetailerInventoryProduct[] = [];
  model: RetailerInventoryProduct;
  deleteSuccess: boolean;
  searchText: string = '';

  constructor(private service: RetailerInventoryProductService, private router: Router) {
  }

  ngOnInit(): void {
    if ((!!sessionStorage.getItem('userId')) && (sessionStorage.getItem('userRole') == 'RETAILER_USER')) {
      this.loadProductList();
    }

  }

  loadProductList() {
    this.service.getProductList().subscribe((data: RetailerInventoryProduct[]) => {
      this.productList = data;
    }, (error) => {
      alert('Error while during fetching retailer inventory..!!');
    });
  }


  handleDeleteProductFromInventory(inventoryId: string) {
    this.service.deleteProductByInventoryId(inventoryId).subscribe((data) => {
      this.deleteSuccess = true;
      setTimeout(() => this.deleteSuccess = false, 3000);
      this.loadProductList();
    }, (err) => {
      alert('Error while during deletion..' + err);
    });

  }

  handleUpdate(inventoryId: string) {
    this.router.navigate(['update-retailer-product', inventoryId]);
  }

  goToAddProduct() {
    this.router.navigate(['add-retailer-product']);
  }

  onSearch(item: RetailerInventoryProduct) {
    return (item.productName.toLocaleLowerCase().indexOf(this.searchText.toLocaleLowerCase())) !== -1;
  }
}
