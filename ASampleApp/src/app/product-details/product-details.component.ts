import { Component, OnInit } from '@angular/core';
import { products } from '../products';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product;
  constructor(
    // 앵귤러 라우터가 동작할 때 사용된 특정 라우팅 규칙을 의미한다.
    // 이 객체ㅔ에는 라우팅 규칙 자제와 라우팅 관련된 데이터가 담겨 있다.
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // +는 뭐지???? => params.get('productId')은 string 이다.
      // 배열 인덱스로 number로 캐스팅하기위해 +를 앞에 붙인다. 과연 좋은 방법인지는 모르겠다.
      // Number(params.get('productId')) === +params.get('productId')
      // ref: https://stackoverflow.com/questions/58086642/meaning-of-in-javascript-or-angular
      this.product = products[+params.get('productId')]
    })
  }

  addToCart(product) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }
}
