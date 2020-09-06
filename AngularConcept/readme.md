# Angular 개요

Angular는 HTML과 TypeScript로 클라이언트 애플리케이션을 개발할 때 사용하는 플랫폼이자 프레임워크이다.

## Module
- 컴포넌트의 묶음: 비슷한 기능을 하나로 묶어서 관리하기 위한 모듈(컴포넌트나 서비스, 폼 등을 모두 포함)
- @NgModule() 데코레이터: 모듈을 정의하는 메타데이터를 전달하면서 실행한다.
- 애플리케이션은 부트스트랩을 하기 위해 최상위 모듈을 꼭 가진다. (`AppModule`)
```typescript
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
```
- JS와 마찬가지로 일부 기능을 모듈 외부로 공개할 수 있다. (export)
- `lazyloading`에 유리하다.

### 메타데이터
```typescript
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  imports:      [ BrowserModule ],
  providers:    [ Logger ], 
  declarations: [ AppComponent ], 
  exports:      [ AppComponent ], 
  bootstrap:    [ AppComponent ] 
})
export class AppModule { }
``` 
- imports: 사용할 다른 모듈
- providers:  안에서 사용하는 서비스 프로바이더를 지정. => 의존성 주입에 꼭 있어야하던가? 없어도되던데.. 주입을 안하고 쓸 수있진 않을텐데.
- declarations: 컴포넌트, 디렉티브, 파이프를 선언
- exports: 모듈의 구성요소를 외부로 공개. 사실 최상위 모듈에서는 지정할 필요 없다.
- bootstrap: 애플리케이션의 최상위 뷰로 표시될 최상위 컴포넌트를 지정. bootstrap 프로퍼티는 최상위 NgModule 에만 지정할 수있다.

### NgModule과 컴포넌트
- 컴포넌트가 *컴파일되는 시점이 컨텍스트를 제공*한다.
- 컴포넌트를 정의할 때에는 **호스트뷰**와 연결된다. 호스트뷰는 컴포넌트에 연결된 뷰들 중 최상위 뷰이다.

## 앵귤러 라이브러리
- 앵귤러 프레임워크는 js 모듈 형태(라이브러리)로 제공된다.
- 각각의 라이브러리는 @angular 접두사로 시작한다. (`import { Component } from '@angular/core';`)
- 

## Component
- 클래스(데이터와 로직 처리)와 템플릿(HTML 뷰)으로 구성된다.
- 컴포넌트는 반드시 export 해야 AppModule와 같은 다른 모듈에서 import 할 수 있습니다.
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
- 라이프사이클 후킹함수를 이용해서 각 시점에서 필요한 동작을 실행할 수 있다.
  - ngOnInit은 라이프싸이클 후킹 함수 입니다. Angular는 컴포넌트를 생성한 직후에 ngOnInit를 호출합니다. 그래서 컴포넌트를 초기화하는 로직은 이 메소드에 작성하는 것이 좋습니다.

### 컴포넌트 메타데이터
- @Component 데코레이터를 붙이기 전까지 이 클래스는 컴포넌트로 등록되지도 않는다.
```typescript
@Component({
  // 
  selector:    'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./heroes.component.css'],
  providers:  [ HeroService ]
})
export class HeroListComponent implements OnInit {
/* . . . */
}
```
- selector: 돔에서 이 컴포넌트의 위치를 결정한다. `<app-hero-list></app-hero-list>`라고 작성한 위치에 HeroListComponent의 인스턴스가 생성된다.
- templateUrl: 컴포넌트의 호스트뷰를 지정한다.
- providers: 의존석으로 주입되는 서비스를 지정
- styleUrls: 컴포넌트에 해당하는 스타일만 따로 정의한다. 이렇게 구현하면 컴포넌트를 재사용하기 편해지며 전역 스타일이 변경되더라도 컴포넌트 스타일에 영향을 주지 않습니다. 컴포넌트에 적용되는 스타일은 @Component.styles 배열에서 인라인으로 정의할 수 있고, 여러 파일에 작성하고 @Component.styleUrls 배열로 지정할 수도 있습니다.  => ???????????

### 템플릿 문법
#### 데이터 바인딩
템플릿과 뷰를 연결

![데이터바인딩](./데이터바인딩.png)
- 문자열 바인딩. **컴포넌트의 `hero.name`의 값**을 텍스트로 표시.
```html
<li>{{hero.name}}</li>
```
- 프로퍼티 바인딩. **컴포넌트의 `selectedHero`의 값**을 hero프로퍼티에 전달한다.
```html
<app-hero-detail [hero]="selectedHero"></app-hero-detail>
``` 
- 이벤트 바인딩. `click` 이벤트가 발생하면 **컴포넌트의 selectHero(hero) 메소드**가 실행된다.
```html
<li (click)="selectHero(hero)"></li>
```
- 양방향 바인딩. 프로퍼티 바인딩+이벤트 바인딩
  템플릿이 변경되면 이벤트 바인딩된 것 처럼 컴포넌트의 프로퍼티 값을 변경하고, 컴포넌트의 프로퍼티 값이 변경되면 프로퍼티 바인딩이 일어난 것 처럼 input의 프로퍼티의 값으로 전달된다.
  자바스크립티의 이벤트 사이클이 실행될 때마다 애플리케이션 최상위 컴포넌트부터 트리를 따라 컴포넌트를 순회하면서 앵귤러가 자동으로 처리한다. 
```html
<input [(ngModel)]="hero.name">
```

### 파이프
파이프를 사용하면 데이터가 템플릿에 표시될 때 원하는 형식을 가지도록 할 수 있다.
기존 값을 새로운 값으로 반환하는 클래스를 만들고 @Pipe 데코레이터를 통해 등록한다.
`파이프 체이닝`, `인자 전달`도 가능하다.

Q. 문자열 바인딩에서만 사용 가능한건가??

```html
 <p>Today is {{today | date}}</p>
```

### 디렉티브
템플릿을 렌더링 할 때 디렉티브가 있으면 돔의 모양을 디렉티브 로직에 따라 변형하고 @Directive() 데코레이터를 사용해서 정의한다.
- 구조 디렉티브
  돔에 엘리먼트를 추가,제거,치환한다. ex) `*ngIf`, `*ngFor`
- 어트리뷰트 디렉티브
  이미 존재하는 엘리먼트의 동작이나 모양을 변형한다. ex) `[(ngModel)]`

## 템플릿, 디렉티브, 데이터 바인딩
- 템플릿: HTML문법 + Angular마크업
- 디렉티브: 원하는 동작을 하도록 확장
- 데이터 바인딩: 뷰를 돔과 연결(이벤트 바인딩, 프로퍼티 바인딩)
앵귤러는 *뷰가 화면에 표시되기 전에* 디렉티브와 바인딩 문법을 체크해서 돔에 반영한다.
앵귤러는 양방향 바인딩을 지원한다.

## 서비스, 의존성 주의(Dependency injection, DI)
- @Inejctable 데코레이터: 컴포넌트나 다른 서비스에 의존성으로 주입하기 위해 **다른 구성요소보다 먼저 처리**된다.
- 뷰와 직접적인 관련이 없는 로직(http통신 등)은 서비스로 분리하여 작성하고 의존성 주입을 통해 사용한다.
- 앱에서 공통으로 사용하는 상수나 함수, 기능을 모아놓은 단위

---
### 의존성 주입 (Dependency injection, DI)
@Injectable() 데코레이터를 사용해서 메타데이터를 지정하며, 이 메타데이터는 Angular가 서비스를 컴포넌트에 의존성으로 주입할 때 활용
이 때 인젝터가 중요합니다. Angular는 애플리케이션을 부트스트랩할 때 애플리케이션 전역 범위에 동작하는 인젝터를 생성하며, 이후에 필요한 경우가 있으면 추가 인젝터를 생성합니다. 개발자가 인젝터를 직접 만드는 경우는 없습니다.
어떤 컴포넌트가 어떤 서비스를 의존성 주입하려고 하면 인젝터에 이미 생성된 인스턴스가 있는지 확인하고 없다면 프로바이더에 등록된 방법으로 인스턴스를 새로 만든 뒤 반환한다. 마치 싱글톤 같은데.. 인젝터는 여러가지 싱글톤을 한번에 관리하는 역할을 하는 것 같다..

서비스 프로바이더 등록
- 서비스 메타데이터(@Injectable() 데코레이터)에 자신의 프로바이더를 직접 등록
@TODO: 다른 모듈에서 사용할수 없는지 확인, 모듈 빌드에 어떤 영향을 끼치는지, 인스턴스 생성시점이 언제인지 생성자에 로그를 찍어 확인해보자!
- @NgModule()이나 @Component() 메타데이터에 프로바이더를 등록하고 하위 계층에서 이 프로바이더를 이용 => 서비스 프로바이더를 특정 NgModule에 등록하면, 이 NgModule 범위에 있는 컴포넌트만 같은 서비스 인스턴스를 공유
@TODO: dest에서 확인해보자! 
- @Injectable() 메타데이터를 사용해서 프로바이더를 등록하면, 애플리케이션 배포 단계에서 코드를 최적화하면서 이 서비스가 실제로 사용되는지 확인하고 사용되지 않으면 최종 결과물에서 제외시킬 수도 있습니다.

  
## 라우팅
- Router NgModule: url을 사용해서 애플리케이션 상태를 전환할 수 있다. 
- 페이지 대신 뷰를 url과 매핑하는 방식이다. -> 싱글 페이지 웹이라서 실제로 새로고침되는 것은 아니고 url에 맞게 화면 내용(상태)을 바꿔주는 것이다.

![앵귤러개요](./앵귤러개요.png)

# 메타데이터 (metadata)
개발자가 만든 Angular 구성요소나 서드파티 파일, 라이브러리를 Angular가 조합할 때는 이 구성요소들에 대한 정보

- 컴포넌트 클래스에 지정해야 하는 메타데이터는 @Component 데코레이터에, 애플리케이션 동작에 필요한 메타데이터는 @NgModule 데코레이터에 지정한다.