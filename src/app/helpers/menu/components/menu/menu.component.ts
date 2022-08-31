import { Component, OnInit } from '@angular/core';
import { SingletonService } from 'src/app/singleton.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menu = SingletonService.ESQUEMA;
  enlaces = false;
  iconUrl = 'url("../../../assets/img/icons/iconos-sprite20b.png")';

  constructor(private singletonService: SingletonService) { }

  ngOnInit() {
    console.log("'background': (" + this.iconUrl + ' 0 calc(-20px * ' + 0 + '))');
  }

  logout() {
    this.singletonService.logout();
  }

  changeEnlaces() {
    this.enlaces = true;
  }

}
