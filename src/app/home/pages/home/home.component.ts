import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SingletonService } from 'src/app/singleton.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  menu = SingletonService.ESQUEMA;
  mosaicView = false;
  iconUrl = 'url("../../../assets/img/icons/iconos-sprite32.png")';

  constructor(private router: Router, private singletonService: SingletonService) { }

  ngOnInit() {
  }

  changeView(name: string) {
    this.mosaicView = !this.mosaicView;
  }

}
