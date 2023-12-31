import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkDataService {
  private apiUrl = 'http://localhost:3000/api/workdata';

  constructor(private http: HttpClient) {}

  getWorkData(card_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${card_id}`);
  }

  addWorkData(workData: any): Observable<any> {
    return this.http.post(this.apiUrl, workData);
  }

  updateWorkData(id: number, userPerformance: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { userPerformance });
  }

  deleteWorkData(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateRepetitionData(repetitionDataId: number, userPerformance: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/updateRepetitionData`, { repetitionDataId, userPerformance });
  }
}
