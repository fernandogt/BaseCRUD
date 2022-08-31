import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SingletonService } from '../../singleton.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private singletonService: SingletonService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.singletonService.checkUser();
        let result = true;

        if (localStorage.getItem('tk') === null) {
            // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            this.router.navigate(['/login']);
            result = false;
        }

        return result;
    }
}
