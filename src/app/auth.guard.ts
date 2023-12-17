import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        console.log(this.authService.isAuthenticated())
        if (this.authService.isAuthenticated()) {
            if (state.url == '/login') {
                this.router.navigate(['/dashboard']);
            }

            return true; 
        } else {
            console.log(state)
            if (state.url != '/login' && state.url != '/register' && state.url != '/cart') {
                this.router.navigate(['/login']);
                return false;
            }
            return true;
        }
    }
}
