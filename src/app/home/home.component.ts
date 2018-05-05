/*
This component is used to display a list of products with their name, images and price. 
And on clicking the image of the product, it opens the detail page of that product. 
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';             
import { Products } from '../product-list';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { StorageType, PersistenceService } from 'angular-persistence';
import { AsyncLocalStorage } from 'angular-async-local-storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

//HomeComponent class defination
export class HomeComponent implements OnInit {
    userFilter: any = { name: '' };
    productListToBeShown : any = [];
    // lastIndex = 8;
    productsAddedToCart : any = [];
    productsInCartCount : number = 0;
  //Instantiating the Router in the constructor
  constructor(private router: Router, 
  private persistenceService: PersistenceService,
  protected storage: AsyncLocalStorage
  ) { }

  //Component's OnInit function  
  ngOnInit() {
    /*get the products and the product count added to the cart as soon as
     the component init function is called */
      this.storage.getItem('productsAddedToCart')
      .subscribe((data) => {
        this.productsAddedToCart = data;
        if(this.productsAddedToCart == null || this.productsAddedToCart == undefined) {
            this.productsAddedToCart = [];
            this.productsInCartCount = 0;
        } else {
          this.productsInCartCount = this.productsAddedToCart.length;
        }
          // Done
      },() => {
          // Error
      });  

      this.storage.getItem('productListToBeShown')
      .subscribe((data) => {
        this.productListToBeShown = data;
        console.log("data", data)
        if(data == null ||(data && data.length == 0)) {
          console.log("here")
            // this.productListToBeShown = Products.slice(0,8)
            this.productListToBeShown = Products;
               /*get all the products on homepage as soon as
             the component init function is called */
            this.storage.setItem('productListToBeShown', this.productListToBeShown)
              .subscribe(() => {
                console.log("set 1 home",this.productListToBeShown[0])
                // Done
              }, () => {
                // Error
              });
        }
        // console.log("productListToBeShown data > ",JSON.stringify(this.productListToBeShown))
      },() => {
          // Error
      });  



  // console.log("productsAddedToCart, this.productsAddedToCart.length", this.productsAddedToCart, this.productsAddedToCart.length)
  // console.log("productListToBeShown, this.productsInCartCount", this.productListToBeShown, this.productsInCartCount)
  }

  //Navigate to the product detail page of that product being clicked on homepage
  goTo(id) {
    this.router.navigate(['product-detail/'+id]);
  }

  //Add the product to cart
  addToCart(id) { 
      const res = Products.filter(x => x.id == id);
      // res[0].addedToCart = true;
      // this.productListToBeShown = Products.filter(x => x.id != id);
      // this.productListToBeShown.push(res[0]);
      // this.productListToBeShown = this.productListToBeShown.sort(function (a, b) {
      //   return a.id - b.id;
      // });
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
        // Done
        console.log("after setting productListToBeShown", JSON.stringify(this.productListToBeShown))
      }, () => {
        // Error
      });

      this.productsAddedToCart.push(res[0]);
      this.productsInCartCount = this.productsAddedToCart.length;
      
      /* saving the products added to cart in session
       */
      this.storage.setItem('productsAddedToCart', this.productsAddedToCart).subscribe(() => {
          // Done
                  console.log("set 2 home")

        }, () => {
          // Error
        });
      console.log("id", id, JSON.stringify(this.productListToBeShown))

      // localStorage.setItem('productsAddedToCart',this.productsAddedToCart)

      // this.persistenceService.set('productsAddedToCart',this.productsAddedToCart, {type: StorageType.LOCAL})

  }

  //Remove the product from cart
  removeToCart(id) {
      const res = Products.filter(x => x.id == id);
      // this.productListToBeShown = Products.filter(x => x.id != id);
      // res[0].addedToCart = false;
      // this.productListToBeShown.push(res[0]);
      // this.productListToBeShown = this.productListToBeShown.sort(function (a, b) {
      //   return a.id - b.id;
      // });
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
        // Done
                console.log("set 3 home")

      }, () => {
        // Error
      });
      this.productsAddedToCart = this.productsAddedToCart.filter(x => x.id != id);   
      this.productsInCartCount = this.productsAddedToCart.length;
      // this.persistenceService.set('productsAddedToCart',this.productsAddedToCart, {type: StorageType.LOCAL})
      // console.log("productListToBeShown >>> products in cart >  productsInCartCount", this.productListToBeShown, this.productsAddedToCart, this.productsInCartCount)
      
      /* saving the products added to cart in session
       */
      this.storage.setItem('productsAddedToCart', this.productsAddedToCart).subscribe(() => {
          // Done
                  console.log("set 4 home")

        }, () => {
          // Error
        });
  }

  //Load next number of products on scrolling the page down
  onScroll (lastIndex) {
    // this.lastIndex = this.lastIndex + 8;
    // this.productListToBeShown = Products.slice(0,this.lastIndex);
  }

}
