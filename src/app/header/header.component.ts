/*
This component contains the header of the page
*/
import { Component, OnInit } from '@angular/core';
import { AsyncLocalStorage } from 'angular-async-local-storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

//Header component class defination
export class HeaderComponent implements OnInit {
	productsAddedToCart : any = [];
    productsInCartCount : number = 0;
  //component's constructor function
  constructor(protected storage: AsyncLocalStorage) { }

  //component's OnInit function
  ngOnInit() {
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
}
