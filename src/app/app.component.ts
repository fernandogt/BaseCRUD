import { Component, OnInit } from '@angular/core';
import { SingletonService } from './singleton.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'LINCE';
  isLogged = false;
  esquema: Array<any> = [];
  constructor(private singletonService: SingletonService) {}

  ngOnInit() {
    this.singletonService.isLogged().subscribe(
      res => this.isLogged = res
    );
  }
}
