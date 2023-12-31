import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private apiUrl = 'http://localhost:3000/api/tags';

  constructor(private http: HttpClient) {}

  getTags(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addTag(tag: any): Observable<any> {
    return this.http.post(this.apiUrl, tag);
  }

  updateTag(tag_id: number, tag: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${tag_id}`, tag);
  }

  deleteTag(tag_id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${tag_id}`);
  }
}
