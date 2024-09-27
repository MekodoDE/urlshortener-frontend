import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface ServerConfig {
  apiUrl: string;
  appTitle: string;
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private config: ServerConfig | undefined;
  public configSubject = new Subject();
  // private configSubject: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
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
  loadConfig(): any {
    /* if (this.config?Subject.value) {
      // Return cached config as an observable
      return of(this.config?Subject.value);
    }

    // Fetch config from server and cache it
    return this.http.get(this.config?Url).pipe(
      tap((config) => this.config?Subject.next(config)) // Cache the loaded config
    ); */
    if (localStorage.getItem("appTitle") == null || localStorage.getItem("apiUrl") == null) {
      return this.http.get(this.configUrl).subscribe(
        (config) => {this.configSubject.next(config); this.config = config as ServerConfig;
          localStorage.setItem("apiUrl", this.config.apiUrl);
        localStorage.setItem("appTitle", this.config.appTitle)});
    }
    else {
      this.config = {
        appTitle: localStorage.getItem("appTitle")!,
        apiUrl: localStorage.getItem("apiUrl")!
      }
    }
  }

  appTitle(): string {
    if (this.config?.appTitle != null) {
      return this.config.appTitle
    }
    return "";
  }

  getRedirect(): Observable<any> {
    return this.http.get(`${localStorage.getItem("apiUrl")}/urls/${this.urlKey}`)
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
    const url = `${this.config?.apiUrl}/users/`;
    return this.http.post(url, userData) 
  }

  getUsers(): Observable<any> {
    const url = `${this.config?.apiUrl}/users/`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getUser(urlKey: string): Observable<any> {
    const url = `${this.config?.apiUrl}/users/${urlKey}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  updateUser(urlKey: string, userData: any): Observable<any> {
    const url = `${this.config?.apiUrl}/users/${urlKey}`;
    return this.http.put(url, userData, { headers: this.getHeaders() });
  }

  deleteUser(urlKey: string): Observable<any> {
    const url = `${this.config?.apiUrl}/users/${urlKey}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }

  login(loginData: any): Observable<any> {
    const url = `${this.config?.apiUrl}/users/login`;
    return this.http.post(url, loginData);
  }

  // URL service with Observable
  createUrl(newUrl: any): Observable<any> {
    const url = `${this.config?.apiUrl}/urls/`;
    return this.http.post(url, newUrl, { headers: this.getHeaders() });
  }

  getUrls(): Observable<any> {
    const url = `${this.config?.apiUrl}/urls/`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getUrl(urlKey: string): Observable<any> {
    const url = `${this.config?.apiUrl}/urls/${urlKey}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  updateUrl(urlKey: string, newUrl: any): Observable<any> {
    const url = `${this.config?.apiUrl}/urls/${urlKey}`;
    return this.http.put(url, newUrl, { headers: this.getHeaders() });
  }

  deleteUrl(urlKey: string): Observable<any> {
    const url = `${this.config?.apiUrl}/urls/${urlKey}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }
}
