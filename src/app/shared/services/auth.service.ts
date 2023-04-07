import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticate: boolean = false;

  login(email: any, password: string): Observable<boolean> {
    if (email === 'admin@gmail.com' && password === 'admin') {
      localStorage.setItem('login', 'true');
      return of(true);
    }
    return of(false);
  }

  isLoggedIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(!!localStorage.getItem('login'));
    });
  }
}
