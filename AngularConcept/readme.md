# Angular 개요

Angular는 HTML과 TypeScript로 클라이언트 애플리케이션을 개발할 때 사용하는 플랫폼이자 프레임워크이다.

## Module
- NgModule
- 컴포넌트의 묶음이라고 할 수 있다.
- 비슷한 기능을 하나로 묶어서 관리하기 위한 모듈(컴포넌트나 서비스, 폼 등을 모두 포함)
- 애플리케이션은 부트스트랩을 하기 위해 최상위 모듈을 꼭 가진다. (`AppModule`)
- JS와 마찬가지로 일부 기능을 모듈 외부로 공개할 수 있다. (export)
- `lazyloading`에 유리하다.

## Component
- 클래스(데이터와 로직 처리)와 템플릿(HTML 뷰)으로 구성된다.
- 컴포넌트 클래스에 @Component() 데코레이터, 메타데이터에 뷰를 함께 지정한다.
```
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'my-app';
}

```

### 템플릿, 디렉티브, 데이터 바인딩
- 템플릿: HTML문법 + Angular마크업
- 디렉티브: 원하는 동작을 하도록 확장
- 데이터 바인딩: 뷰를 돔과 연결(이벤트 바인딩, 프로퍼티 바인딩)
앵귤러는 *뷰가 화면에 표시되기 전에* 디렉티브와 바인딩 문법을 체크해서 돔에 반영한다.
앵귤러는 양방향 바인딩을 지원한다.

## 서비스, 의존성 주의(Dependency injection, DI)
- @Inejctable 데코레이터: 컴포넌트나 다른 서비스에 의존성으로 주입하기 위해 **다른 구성요소보다 먼저 처리**된다.
- 뷰와 직접적인 관련이 없는 로직(http통신 등)은 서비스로 분리하여 작성하고 의존성 주입을 통해 사용한다.

## 라우팅
- Router NgModule: url을 사용해서 애플리케이션 상태를 전환할 수 있다. 
- 페이지 대신 뷰를 url과 매핑하는 방식이다. -> 싱글 페이지 웹이라서 실제로 새로고침되는 것은 아니고 url에 맞게 화면 내용(상태)을 바꿔주는 것이다.

![앵귤러개요](./앵귤러개요.png)