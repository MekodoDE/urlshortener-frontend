import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private config: any;
  urlKey = '';

  constructor(private http: HttpClient, private router: Router) {
    const urlParts = this.router.url.split('/');
    // Remove the first element which is an empty string
    urlParts.shift();
    // Return the first segment of the URL (excluding the domain and protocol)
    this.urlKey = urlParts[0];
  }

  loadConfig() {
    return this.http.get(environment.configUrl).toPromise().then((data) => {
      this.config = data;
    });
  }

  appTitle() {
    return this.config?.appTitle;
  }

  getRedirect() {
    const url = `${this.config?.apiUrl}${this.urlKey}`;
    return this.http.get(url);
  }

  getUrls() {
    const url = `${this.config?.apiUrl}`;
    return this.http.get(url);
  }

  getUrl(urlKey: string) {
    const url = `${this.config?.apiUrl}${urlKey}`;
    return this.http.get(url);
  }

  createUrl(newUrl: any) {
    const url = `${this.config?.apiUrl}`;
    return this.http.post(url, newUrl);
  }

  updateUrl(urlKey: string, newUrl: any) {
    const url = `${this.config?.apiUrl}${urlKey}`;
    return this.http.put(url, newUrl);
  }

  deleteUrl(urlKey: string) {
    const url = `${this.config?.apiUrl}${urlKey}`;
    return this.http.delete(url);
  }
}
