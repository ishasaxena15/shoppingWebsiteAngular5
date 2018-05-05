/*
Here Product is defined as a class. This class type can be used in the app to define any object of product type
*/
export class Product {
	id: number;
	name: string;
	price: number;
	description: string;
	category: string;
	subCategory: string;
	rating: number;
	image: string;
	addedToCart: boolean;
}