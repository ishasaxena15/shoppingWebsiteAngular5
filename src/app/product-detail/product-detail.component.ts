/*
This component is used to display product details of a particular product. 
And it has a back button to navigate back to the home page. 
*/
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';             
import {Products} from '../product-list';
import {Product} from '../product';
import { AsyncLocalStorage } from 'angular-async-local-storage';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  //instantiating the Router and 
  //ActivatedRoute in constructor to be used
  //initialising the Products array 
  productList = Products;
  product : Product;
  productListToBeShown : any = [];
  productsAddedToCart : any = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    protected storage: AsyncLocalStorage
    ) {}

  ngOnInit() {
  //calling getProdById() to get the 
  //product details of that product 
  //which is being clicked on homepage
  this.getProdById();
    /*get the products and the product count added to the cart as soon as
     the component init function is called */
      this.storage.getItem('productsAddedToCart')
      .subscribe((data) => {
        this.productsAddedToCart = data;
        if(this.productsAddedToCart == null || this.productsAddedToCart == undefined) {
            this.productsAddedToCart = [];
        }
      },() => {});  
  
  }

//moving back to the homepage from product detail page
  back() {
  	this.router.navigate(['home']);
  }

  //filter the product in product array based on the product id recieved from the parameter.
  getProdById() {

    const id = +this.route.snapshot.paramMap.get('id');
    this.storage.getItem('productListToBeShown')
      .subscribe((data) => {
        this.productListToBeShown = data;
        console.log("this.productListToBeShown", this.productListToBeShown)
  	    const res = this.productListToBeShown.filter(x => x.id == id);
        this.product = res[0];
    console.log("getProdById called")
  	console.log("this.product", this.product)
    },() => {});
  }

    //Add the product to cart
  addToCart(id) { 
      const res = Products.filter(x => x.id == id);
      this.productListToBeShown = this.productListToBeShown.map(item=> {
        if(item.id == id) {
          item.addedToCart = true;
        }
        return item;
      });

      /*get all the products on homepage as soon as
     the component init function is called */
      this.storage.setItem('productListToBeShown', this.productListToBeShown)
      .subscribe(() => {
          this.getProdById();
      }, () => {});
      this.productsAddedToCart.push(res[0]);
      
      /* saving the products added to cart in session
       */
      this.storage.setItem('productsAddedToCart', this.productsAddedToCart)
      .subscribe(() => {}, () => {});
  }

  //Remove the product from cart
  removeToCart(id) {
      this.productListToBeShown = this.productListToBeShown.map(item=> {
        if(item.id == id) {
          item.addedToCart = false;
        }
        return item;
      });

      /*get all the products on homepage as soon as
     the component init function is called */
      this.storage.setItem('productListToBeShown', this.productListToBeShown)
      .subscribe(() => {}, () => {});
      this.productsAddedToCart = this.productsAddedToCart.filter(x => x.id != id);   

      /* saving the products added to cart in session
       */
      this.storage.setItem('productsAddedToCart', this.productsAddedToCart)
      .subscribe(() => {}, () => {});
  }
}
