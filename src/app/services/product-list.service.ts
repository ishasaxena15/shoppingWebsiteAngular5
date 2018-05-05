import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Product} from '../product';
@Injectable()
export class ProductListService {

  private ProductList = new BehaviorSubject<Product[]>([]);
  constructor() { }

}
