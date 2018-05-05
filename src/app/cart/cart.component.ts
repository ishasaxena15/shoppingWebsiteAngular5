import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';             
import { AsyncLocalStorage } from 'angular-async-local-storage';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
    productsAddedToCart : any = [];
    productsInCartCount : number = 0;
  	productListToBeShown : any = [];
  	constructor(private router: Router,
  	protected storage: AsyncLocalStorage
  	) { }

  	ngOnInit() {
	
	 	this.storage.getItem('productListToBeShown').subscribe((data) => {
			  console.log("productListToBeShown", data)
			  this.productListToBeShown = data;
			  // Done
			}, () => {
			  // Error
		}); 	
	 	this.storage.getItem('productsAddedToCart').subscribe((data) => {
	  		console.log("productsAddedToCart", data)
	  // Done
				this.productsAddedToCart = data;
			  	if(this.productsAddedToCart == null || this.productsAddedToCart == undefined) {
			        this.productsAddedToCart = [];
			        this.productsInCartCount = 0;
			    } else {
			      this.productsInCartCount = this.productsAddedToCart.length;

			    }
		}, () => {
		  // Error
		});

	}

	emptyCart() {
		// this.storage.getItem('productsAddedToCart').subscribe((data) => {
	 //  // Done	
		// 		this.productsAddedToCart = data;
			  	
			  	this.productListToBeShown = this.productListToBeShown.map(item => {
			  		item.addedToCart = false;
			  		console.log("item", item)
			  		return item;
			  	})

					this.storage.removeItem('productsAddedToCart').subscribe(() => {
						this.productsAddedToCart =[];
						this.productsInCartCount = 0;
						/*get all the products on homepage as soon as
					     the component init function is called */
					      	this.storage.setItem('productListToBeShown', this.productListToBeShown)
					      	.subscribe(() => {
					        // Done
					                console.log("set 1 cart")

					      	}, () => {
					        // Error
					      	});
					}, () => {});
		// }, () => {
		// 			  // Error
		// });
	
	}
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
      .subscribe(() => {
      	        console.log("set 2 cart")

      }, () => {});
      
      this.productsAddedToCart = this.productsAddedToCart.filter(x => x.id != id);   

      /* saving the products added to cart in session
       */
      this.storage.setItem('productsAddedToCart', this.productsAddedToCart)
      .subscribe(() => {
      	        console.log("set 3 cart")

      }, () => {});
  }

  //moving back to the homepage from product detail page
  back() {
  	this.router.navigate(['home']);
  }
}
