import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../../auth-services/storage-service/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class UserGuard implements CanActivate {

  constructor(private router: Router,
    private snackBar: MatSnackBar) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!StorageService.hasToken()) {
      StorageService.logout();
      this.router.navigateByUrl('/login');
      this.snackBar.open('You are not logged in, Login first!', 'close', {
        duration: 5000
      });
      return false;
    }
    return true;
  }


};
