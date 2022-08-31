import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SingletonService } from 'src/app/singleton.service';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.scss']
})
export class Home2Component implements OnInit {
  menu = SingletonService.ESQUEMA;
  iconUrl = 'url("../../../assets/img/icons/iconos-sprite40.png")';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  changeView(name: string) {
    this.router.navigate([name]);
  }

}
