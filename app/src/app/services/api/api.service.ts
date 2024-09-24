import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private configSubject: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  configUrl = '';
  urlKey = '';

  constructor(private http: HttpClient, private router: Router) {
    const urlParts = this.router.url.split('/');
    urlParts.shift(); // Remove the first element which is an empty string
    this.urlKey = urlParts[0];
    this.configUrl = window.location.origin + environment.configUrl;
    this.loadConfig();
  }

  // Load config and cache it
  loadConfig(): Observable<any> {
    if (this.configSubject.value) {
      // Return cached config as an observable
      return of(this.configSubject.value);
    }

    // Fetch config from server and cache it
    return this.http.get(this.configUrl).pipe(
      tap((config) => this.configSubject.next(config)) // Cache the loaded config
    );
  }

  // Helper function to ensure config is loaded before making an API call
  private withConfig<T>(operation: (config: any) => Observable<T>): Observable<T> {
    return this.loadConfig().pipe(
      switchMap(config => operation(config))
    );
  }

  appTitle(): Observable<any> {
    return this.withConfig(config => {
      return config.appTitle;
    });
  }

  getRedirect(): Observable<any> {
    return this.withConfig(config => {
      const url = `${config.apiUrl}/urls/${this.urlKey}`;
      return this.http.get(url);
    });
  }

  // Headers

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getUserId(): string | null {
    const token = localStorage.getItem('jwtToken');
    console.log(token)
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.sub;
    }
    return null;
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.role;
    }
    return null;
  }

  // User service
  createUser(userData: any): Observable<any> {
    return this.withConfig(config => {
      const url = `${config.apiUrl}/users/`;
      return this.http.get(url);
    });
  }

  getUsers(): Observable<any> {
    return this.withConfig(config => {
      const url = `${config.apiUrl}/users/`;
      return this.http.get(url, { headers: this.getHeaders() });
    });
  }

  getUser(urlKey: string): Observable<any> {
    return this.withConfig(config => {
      const url = `${config.apiUrl}/users/${urlKey}`;
      return this.http.get(url, { headers: this.getHeaders() });
    });
  }

  updateUser(urlKey: string, userData: any): Observable<any> {
    return this.withConfig(config => {
      const url = `${config.apiUrl}/users/${urlKey}`;
      return this.http.put(url, userData, { headers: this.getHeaders() });
    });
  }

  deleteUser(urlKey: string): Observable<any> {
    return this.withConfig(config => {
      const url = `${config.apiUrl}/users/${urlKey}`;
      return this.http.delete(url, { headers: this.getHeaders() });
    });
  }

  login(loginData: any): Observable<any> {
    return this.withConfig(config => {
      const url = `${config.apiUrl}/users/login`;
      return this.http.post(url, loginData);
    });
  }

  // URL service with Observable
  createUrl(newUrl: any): Observable<any> {
    return this.withConfig(config => {
      const url = `${config.apiUrl}/urls/`;
      return this.http.post(url, newUrl, { headers: this.getHeaders() });
    });
  }

  getUrls(): Observable<any> {
    return this.withConfig(config => {
      const url = `${config.apiUrl}/urls/`;
      return this.http.get(url, { headers: this.getHeaders() });
    });
  }

  getUrl(urlKey: string): Observable<any> {
    return this.withConfig(config => {
      const url = `${config.apiUrl}/urls/${urlKey}`;
      return this.http.get(url, { headers: this.getHeaders() });
    });
  }

  updateUrl(urlKey: string, newUrl: any): Observable<any> {
    return this.withConfig(config => {
      const url = `${config.apiUrl}/urls/${urlKey}`;
      return this.http.put(url, newUrl, { headers: this.getHeaders() });
    });
  }

  deleteUrl(urlKey: string): Observable<any> {
    return this.withConfig(config => {
      const url = `${config.apiUrl}/urls/${urlKey}`;
      return this.http.delete(url, { headers: this.getHeaders() });
    });
  }
}
