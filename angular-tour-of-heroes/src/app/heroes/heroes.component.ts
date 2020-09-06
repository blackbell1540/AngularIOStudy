import { Component, OnInit, ɵConsole } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  // hero: Hero = {id: 1, name: 'Windstorm'};
  heroes: Hero[] = HEROES;
  selectedHero: Hero;
  constructor() { }

  ngOnInit(): void {
    console.log(this.heroes);
  }

  // 컴포넌트의 hero 프로퍼티를 selectedHero로 변경하지만 이 프로퍼티에 값을 직접 할당하지는 않습니다.
  // 왜냐하면 애플리케이션이 실행되는 시점에 선택된 히어로 는 없기 때문입니다.
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

}
