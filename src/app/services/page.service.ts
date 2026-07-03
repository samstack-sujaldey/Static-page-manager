import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  private http = inject(HttpClient);
  private apiurl = 'http://localhost:5000/api/admin';

  getPages() {
    return this.http.get<Page[]>(this.apiurl);
  }

  addPages(pageData: any) {
    return this.http.post<Page>(this.apiurl, pageData);
  }

  viewPage(slug: string) {
    return this.http.get<Page>(`http://localhost:5000/api/pages/${slug}`);
  }
}
