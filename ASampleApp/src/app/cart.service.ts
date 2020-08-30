import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  // 원래는 이 서비스가 app.module.ts 파일에 자동으로 등록된다. 
  // Angular CLI를 사용해서 서비스를 생성하면 번들링 최적화를 위해 
  // @Injectable() 데코레이터에 { providedIn: 'root' }가 지정되기 때문에 
  // 서비스가 앱 모듈에 등록되지 않는다.
  // 서비스도 각 필요한 모듈에만 provide할 수 있다. => 근데 생성은 필요할 때 생성되었던 걸로 기억.
  providedIn: 'root'
})
export class CartService {
  items = [];
  constructor(
    private http: HttpClient
  ) { }

  addToCart(product) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  getShippingPrices() {
    return this.http.get('/assets/shipping.json');
  }
}
